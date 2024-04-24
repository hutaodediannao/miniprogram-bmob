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
    },
    methods: {
        changePage(param) {
            console.log("开始切换页面=====>", param);
        }
    },
    observers: {
        'pageIndex': function (v) {
            console.log("tabPage组件中监听到页面切换事件=======>", v);
        }
    }
});
