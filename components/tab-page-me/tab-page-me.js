const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const user = getApp().globalData.user;


Component({

    properties: {},

    data: {
        tag: 'tab-page-me',
        user: globalData.user,
        gender: {
            w: '../../imgRes/wan_sex_w.png',
            m: '../../imgRes/wan_sex_m.png'
        },
    },

    lifetimes: {
        ready: function () {
            console.log(this.data.tag, "ready()=====>开始执行");
            if (globalData.user != null) {
                this.setData({
                    user: globalData.user,
                });
            }
        },
    },

    pageLifetimes: {
        show: function () {
            console.log(this.data.tag, "show()=====>开始执行");
            this.setData({
                user: globalData.user,
            });
        }
    },

    methods: {

        submitTap() {
            console.log('submitHistory')
            wx.navigateTo({
                url: '/pages/submit/submit'
            })
        },

        catchTap() {
            console.log("tab-page-me", "catchTap()")
            wx.navigateTo({
                url: '/pages/setting/setting'
            })
        },

        handleTap() {
            let that = this;
            wx.navigateTo({
                url: '/pages/me/me',
                events: {
                    getData: function (data) {
                        console.log('tab-page', data);
                        that.setData({
                                user: globalData.user,
                            }
                        );
                    }
                }
            })
        },

    },
});
