Component({
    properties: {
        textColor: {
            type: String,
            value: '#000000',
        },
        selectTextColor: {
            type: String,
            value: '#ffffff',
        },
        selectBackgroundColor: {
            type: String,
            value: '#efdd10',
        },
        normaBackgroundColor: {
            type: String,
            value: '#ffffff',
        },
        strokeColor: {
            type: String,
            value: '#efdd10',
        },
        radios: {
            type: Array,
            value: [
                '页签一',
                '页签二',
                '页签三'
            ],
        },
        tabsCount: {
            type: Number,
            value: 3,
        },
        currentIndex: {
            type: Number,
            value: 0,
        }
    },
    data: {},

    pageLifetimes: {
        show: function () {
            console.log(this.data.tag, "show()开始执行");
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    },

    methods: {
        itemClick(evt) {
            this.setData({
                currentIndex: evt.currentTarget.dataset.index
            });
            this.triggerEvent('tabClick', evt.currentTarget.dataset.index);
        },
    },

});
