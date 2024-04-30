const Bmob = getApp().globalData.Bmob;
const common = require('../../util/base');
const user = getApp().globalData.user;
const TAG = 'cardInfo';

Page({
    enterClick() {
        console.log('enter');
        this.setData({
            isShow: false
        });
        this.submit();
    },

    cancelClick() {
        console.log('cancel');
    },

    upload() {
        this.setData({
            isShow: true,
        })
    },

    data: {
        title: '详情信息',
        lifeData: null,

        titleTextWidth: common.screenWidth,
        timeIcon: 'ClockCircleOutline',
        locationIcon: 'EnvironmentOutline',
        nameIcon: 'FlagOutline',
        personIcon: 'TeamOutline',

        isShow: false,
        submitOk: false,
    },

    onLoad: function (options) {
        let lifeDataStr = decodeURIComponent(options.lifeData);
        let lifeData = JSON.parse(lifeDataStr);

        let query = wx.createSelectorQuery();
        query.select("#pro").boundingClientRect(res => {
                console.log(TAG, "width:" + res.width);
                let titleTextWidth = common.screenWidth - 50 - 20
                this.setData({
                    lifeData: lifeData,
                    titleTextWidth: titleTextWidth,
                });
            }
        ).exec();
    },

    onUnload() {
        console.log(this.data.tag, "onUnload()");
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('getData', {
            submitOk: this.data.submitOk
        })
    },

    preImage(e) {
        console.log(TAG, e.target.dataset.clickurl);
        wx.previewImage({
            urls: this.data.lifeData.icons.length > 0 ? this.data.lifeData.icons : [this.data.lifeData.icon],
            current: e.target.dataset.clickurl
        })
    },

    submit() {
        wx.showLoading({
            title: "提交中,请稍等..."
        });
        const query = Bmob.Query('scene');
        query.get(this.data.lifeData.objectId).then((res) => {
            console.log("cardInfo.get=====>", res);
            let submitUsers = res.submitUsers;
            if (submitUsers == null) {
                submitUsers = [user];
            } else {
                //判断是否已经报名了
                let size = submitUsers.filter(userItem => userItem.objectId === user.objectId).length;
                if (size <= 0) {
                    submitUsers.push(user);
                } else {
                    wx.showToast({
                        title: "你已经报名了！",
                        icon: 'error'
                    });
                    return;
                }
            }

            query.set("id", res.objectId);
            query.set("submitUsers", submitUsers);
            query.save().then(res => {
                console.log("cardInfo.save=====>", res)
                wx.hideLoading();
                wx.showToast({
                    title: "提交成功!",
                    duration: 2000,
                    success: res1 => {
                        this.setData({
                            submitOk: true,
                        });
                        setTimeout(() => wx.navigateBack(), 2000);
                    }
                });
            }).catch(err => {
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: "提交失败!",
                    icon: 'error'
                })
            });
        })
    }
});



