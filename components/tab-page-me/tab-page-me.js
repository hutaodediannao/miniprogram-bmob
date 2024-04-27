const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;

Component({

    properties: {},

    data: {
        tag: 'tab-page-me',
        user: {
            avatarUrl: '/imgRes/lv.png',
            nickName: '张三',
            gender: 0,
        },
        gender: {
            w: '../../imgRes/wan_sex_w.png',
            m: '../../imgRes/wan_sex_m.png'
        },
    },

    lifetimes: {
        ready: function () {
            console.log(this.data.tag, "ready()=====>开始执行");
            this.updateUser();
        },
    },

    pageLifetimes: {
        show: function () {
            console.log(this.data.tag, "show()=====>开始执行");
            this.updateUser();
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

                // res.avatarUrl = avatarUrl;
                // Bmob.User.upInfo(res).then(v => {
                //     console.log(this.data.tag, "修改用户图像成功 =====> ");
                //     console.log(this.data.tag, v);
                //     this.updateUser();
                // });

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
                    globalData.user = res;
                }
            });
        },

        //点击登录按钮
        login() {
            //获取用户当前信息
            if (globalData.user) {
                //未获取用户信息,标识用户未注册成功,需要bmob的API重新注册


            } else {
                const query = Bmob.Query(Bmob.User.className);
                const objectId = globalData.user.objectId;
                query.get(objectId).then(res => {
                    console.log(res);

                }).catch(err => {
                    console.log(err)
                });
            }
        },

        submitTap() {
            console.log('submitHistory')
            wx.navigateTo({
                url: '/pages/submit/submit'
            })
        },

        showTap() {
            wx.showModal({
                title: '退出登录',
                content: '确定退出登录吗?',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        catchTap() {
            console.log("tab-page-me", "catchTap()")
            wx.navigateTo({
                url: '/pages/setting/setting'
            })
        },
        handleTap() {
            wx.navigateTo({
                url: '/pages/me/me'
            })
        },

    }
});
