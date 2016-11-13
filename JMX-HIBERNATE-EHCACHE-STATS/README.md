### Versions
- Hibernate: 3.5.4
- Ehcache  : 2.10.1
- Spring   : 4.0.6

### JMX Access via JConsole
Add following attributes to the CATALINA_OPTS in the main tomcat process

```
-Dcom.sun.management.jmxremote.port=1616
-Dcom.sun.management.jmxremote.rmi.port=1616
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.local.only=false
-Djava.rmi.server.hostname=localhost
```
Create SSH Tunnel:
```
putty.exe -ssh user@your_app_server.com -L 1616:your_app_server.com:1616
```
Access MBeans via JConsole:
```
jconsole localhost:1616
```

### Enable Hibernate and Ehcache statistics
Refer to applicationContext.xml and ehcache.xml file

