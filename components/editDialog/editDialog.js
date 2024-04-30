const common = require('../../util/base.js');

Component({
    properties: {
        cancelOutSide: {
            type: Boolean,
            value: true
        },
        width: {
            type: Number,
            value: common.screenWidth - 40
        },
        title: {
            type: String,
            value: "标题"
        },
        content: {
            type: String,
            value: "内容"
        },
        isShow: {
            type: Boolean,
            value: false
        },
        left: {
            type: String,
            value: "取消"
        },
        right: {
            type: String,
            value: "确定"
        }
    },

    data: {},

    methods: {
        rightClick() {
            this.triggerEvent('enterClick');
        },

        leftClick() {
            this.setData({
                isShow: false
            });
            this.triggerEvent('cancelClick');
        },

        clickOutSide() {
            if (this.data.cancelOutSide === true) {
                this.setData({
                    isShow: false
                });
            }
        }
    }

});
