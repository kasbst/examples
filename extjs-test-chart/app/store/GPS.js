var json_gps_data = [];

Ext.Ajax.request({
     url: 'app/store/data.txt',

     success: function(response, opts) {
        var raw_gps_data = Ext.decode(response.responseText);
        var hour = 0;

        while (raw_gps_data[0].length > 0) {
              var json = {
                         "monday": "",
                         "tuesday": "",
                         "wednesday": "",
                         "thursday": "",
                         "friday": "",
                         "saturday": "",
                         "sunday": ""
			 };

               for (var i = 0; i < raw_gps_data.length; i++) {		
                    json["hour"]  = hour;
	
                    if (i === 0 ) {
                        json["monday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 1) {
                        json["tuesday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 2) {
                        json["wednesday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 3) {
                        json["thursday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 4) {
                        json["friday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 5) {
                        json["saturday"] = Math.round(raw_gps_data[i].shift());
                    } else if (i === 6) {
                        json["sunday"] = Math.round(raw_gps_data[i].shift());
                    }			
                }
                json_gps_data.push(json);
                hour++;
        }
        console.log(json_gps_data);
     },

     failure: function(response, opts) {
         console.log('server-side failure with status code ' + response.status);
     },
	 
     callback: function(opt, succes, response) {
         Ext.define('ExtTestApp.store.GPS', {
             extend: 'Ext.data.Store',
             alias: 'store.gps',
             autoLoad: true,
		 	
             fields: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'hour'],
             data: json_gps_data,
		 	
          });	 
      }
 });
