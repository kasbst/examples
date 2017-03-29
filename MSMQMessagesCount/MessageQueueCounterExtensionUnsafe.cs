using System;
using System.Messaging;
using System.Runtime.InteropServices;

namespace MessageQueueCounterExtensionUnsafe
{
    static class MessageQueueCounterUnsafe
    {
        [DllImport("mqrt.dll")]
        private unsafe static extern int MQMgmtGetInfo(char* computerName, char* objectName, MQMGMTPROPS* mgmtProps);

        private const byte VT_NULL = 1;
        private const byte VT_UI4 = 19;
        private const int PROID_MGMT_QUEUE_MESSAGE_COUNT = 7;

        [StructLayout(LayoutKind.Sequential)]
        private struct MQPROPVariant
        {
            public byte vt;         //0
            public byte spacer;     //1
            public short spacer2;   //2
            public int spacer3;     //4
            public uint ulVal;      //8
            public int spacer4;     //12
        }

        [StructLayout(LayoutKind.Sequential)]
        private unsafe struct MQMGMTPROPS
        {
            public int cProp;
            public int* aPropID;
            public MQPROPVariant* aPropVar;
            public int* status;
        }

        public static uint GetCount(this MessageQueue queue)
        {
            return GetCount(queue.Path);
        }

        private static unsafe uint GetCount(string path)
        {
            if (!MessageQueue.Exists(path))
            {
                return 0;
            }

            MQMGMTPROPS props = new MQMGMTPROPS();
            props.cProp = 1;

            int aPropId = PROID_MGMT_QUEUE_MESSAGE_COUNT;
            props.aPropID = &aPropId;

            MQPROPVariant aPropVar = new MQPROPVariant();
            aPropVar.vt = VT_NULL;
            props.aPropVar = &aPropVar;

            int status = 0;
            props.status = &status;

            IntPtr objectName = Marshal.StringToBSTR("queue=Direct=OS:" + path);
            try
            {
                int result = MQMgmtGetInfo(null, (char*)objectName, &props);
                if (result != 0 || *props.status != 0 || props.aPropVar->vt != VT_UI4)
                {
                    return 0;
                }
                else
                {
                    return props.aPropVar->ulVal;
                }
            }
            finally
            {
                Marshal.FreeBSTR(objectName);
            }
        }
    }

    class MessageQueueCounterExtensionUnsafe
    {
        static void Main(string[] args)
        {
            string queueName = @".\Private$\PP";
            MessageQueue queue = null;

            if (!MessageQueue.Exists(queueName))
            {
                Console.WriteLine("Creating Private queue: " + queueName);
                queue = MessageQueue.Create(queueName);

                for (int i = 0; i < 10000; i++)
                {
                    Console.WriteLine("Creating Message" + i);
                    queue.Send("Message" + i, "Message" + i);
                }
            }
            else
            {
                queue = new MessageQueue(queueName);

                if (queue.GetCount() == 0)
                {
                    for (int i = 0; i < 10000; i++)
                    {
                        Console.WriteLine("Creating Message" + i);
                        queue.Send("Message" + i, "Message" + i);
                    }
                }
            }

            Console.WriteLine("Message queue contains: " + queue.GetCount() + " messages");

            Console.ReadKey();
        }
    }

}
