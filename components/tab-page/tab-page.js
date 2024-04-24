const {tabPageHeight} = require("../../util/base");

Component({
    properties: {
        pageIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabPageHeight: tabPageHeight,
        pageColor: '#ff0000'
    },
    methods: {
        changePage(param) {
            console.log("开始切换页面=====>", param);
        }
    },
    observers: {
        'pageIndex': function (v) {
            console.log("tabPage组件中监听到页面切换事件=======>", v);
            let color;
            switch (v) {
                case 0:
                    color = '#ff0000';
                    break
                case 1:
                    color = '#00ff00';
                    break
                case 2:
                    color = '#0000ff';
                    break
                default:
                    color = '#ff0000';
                    break
            }
            this.setData({
                pageColor: color,
            })
        }
    }
});
