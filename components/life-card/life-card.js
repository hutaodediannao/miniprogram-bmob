const user = getApp().globalData.user;
const Bmob = getApp().globalData.Bmob;

Component({
    properties: {
        lifeData: {
            type: Object,
            value: null
        }
    },
    data: {
        timeIcon: 'ClockCircleOutline',
        locationIcon: 'EnvironmentOutline',
        nameIcon: 'FlagOutline',
        personIcon: 'TeamOutline',

        textWidth() {
            let textWidth = wx.getWindowInfo().screenWidth - 10 * 4 - 160 - 10;
            return textWidth;
        },
        cardWidth() {
            return wx.getWindowInfo().screenWidth - 10 * 2;
        }
    },
    methods: {
        toInfo() {
            let js = JSON.stringify(this.data.lifeData);
            let ld = encodeURIComponent(js);
            let that = this;
            wx.navigateTo({
                url: '/pages/cardInfo/cardInfo?lifeData=' + ld,
                events: {
                    getData: function (data) {
                        console.log('life-card, 此处需要判断是否需要主页列表刷新', data);
                        //提交上车后, 需要刷新主页列表,此处表示组件回传事件给page (data表示参数)
                        that.triggerEvent("callback", data);
                    }
                }
            })
        },

        tap() {
           this.triggerEvent("triggerDialog", this.data.lifeData);
        }
    }
});
