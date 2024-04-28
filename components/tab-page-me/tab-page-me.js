const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;

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
        //点击头像修改
        onChooseAvatar(e) {
            let avatarUrl = e.detail.avatarUrl;
            //开始修改服务器用户信息图片地址
            const query = Bmob.Query(Bmob.User.className);
            const objectId = globalData.user.objectId;
            query.get(objectId).then(res => {
                res.set('avatarUrl', avatarUrl)
                res.save().then(res => {
                    wx.showToast({
                        title: '修改成功',
                        duration: 2000,
                    });
                    this.updateUser();
                });
            }).catch(err => {
                console.log(err)
            })
        },

        //更新用户信息UI
        updateUser() {
            const query = Bmob.Query(Bmob.User.className);
            const objectId = globalData.user.objectId;
            query.get(objectId).then(res => {
                if (res) {
                    console.log("res.save().then=======> ", res)
                    this.setData({
                        user: res,
                    });

                    //修改全局变量
                    this.getApp().setData({
                        globalData: {
                            user: res,
                        }
                    });
                }
            });
        },

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

    }
});
