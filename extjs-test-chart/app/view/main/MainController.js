Ext.define('ExtTestApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.area-basic',

    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label);
        return value !== '0' ? (value / 1000) : value;
    },

    getSeriesConfig: function (field, title) {
        return {
            type: 'area',
            title: title,
            xField: 'hour',
            yField: field,
            style: {
                opacity: 0.60
            }
        };
    },

    onAfterRender: function () {
        var me = this,
            chart = me.lookup('chart');

        chart.setSeries([
            me.getSeriesConfig('monday', 'Monday'),
            me.getSeriesConfig('tuesday', 'Tuesday'),
            me.getSeriesConfig('wednesday', 'Wednesday'),
            me.getSeriesConfig('thursday', 'Thursday'),
            me.getSeriesConfig('friday', 'Friday'),
            me.getSeriesConfig('saturday', 'Saturday'),
            me.getSeriesConfig('sunday', 'Sunday')
        ]);
    }
});
