const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const TAG = "tab-page-love";

Component({
    properties: {},
    data: {
        current: 0,
        radios: [
            '我的报名',
            '我的收藏'
        ],
    },

    methods: {
        tabClick(evt) {
            console.log('tabClick', evt.detail);
            this.setData({
                current: evt.detail,
            });
        },

        onSwipeChange(evt) {
            console.log('onSwipeChange', evt.detail);
            this.setData({
                current: evt.detail.current,
            });
        },

        onChange(current) {
            current = current.detail;
            this.setData({
                current,
            });
        },
    }
});
