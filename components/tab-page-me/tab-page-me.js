Component({
    properties: {},
    data: {
        userInfo: {
            avatarIcon: 'https://profile-avatar.csdnimg.cn/c9a2595c3dd34fd9bee867605e29cd65_qq_29491123.jpg!1',
            nickName: '张三',
            sex: 'm',
        },
        sex: {
            w: '../../imgRes/wan_sex_w.png',
            m: '../../imgRes/wan_sex_m.png'
        },
    },
    methods: {
        submitTap() {
            wx.navigateTo({
                url: '/pages/submitHistory/submitHistory'
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
