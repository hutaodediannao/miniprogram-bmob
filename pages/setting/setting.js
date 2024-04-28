const user = getApp().globalData.user;
const app = getApp();

Page({

    //点击退出登录
    logOut() {
        this.showTap();
    },

    //点击登录按钮
    login() {
        user.auth().then(res => {
            console.log("Bmob.login()===========>", res);
            console.log('一键登陆成功')
            //开始设置用户信息,并保存
            app.globalData.user = res;
            this.setData({
                user: user,
            });
        }).catch(err => {
            console.log("Bmob.login() err===========>", err)
            app.globalData.user = null;
            this.setData({
                user: user,
            });
        });
    },

    data: {
        title: '设置',
        user: user,
        version: app.version,
    },

    onLoad: function (options) {

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
});
