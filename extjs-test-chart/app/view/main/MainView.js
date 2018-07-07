Ext.define('ExtTestApp.view.main.MainView', {
    extend: 'Ext.Panel',
    xtype: 'area-basic',
    controller: 'area-basic',

    width: 650,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 600,
        insetPadding: '10 20 10 10',
        margin: '80 0 0 0',
        store: {
            type: 'gps'
        },
        legend: {
            docked: 'bottom'
        },
        captions: {
            title: 'Police cars distances driven per week',
            credits: {
                text: 'Weekly data analysis based on distance driven by cars of switzerland police.\n' +
                      'Data source: GPS.',
                align: 'left',
                style: {
                    fontSize: 12
                }
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            title: 'Distance driven (km)',
            grid: true,
            minimum: 0,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            title: 'Hour',
            position: 'bottom',
            fields: 'hour',
            label: {
                rotate: {
                    degrees: 0
                }
            }
        }]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }
}); 

Ext.create('Ext.panel.Panel', {
    title: 'GPS Data Chart Demo App',
    width: '100%',
    renderTo: Ext.getBody()
});
