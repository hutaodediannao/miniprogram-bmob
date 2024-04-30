const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const user = getApp().globalData.user;
const common = require('../../util/base');
const TAG = 'cardInfo';

Page({
    lvoe() {
        wx.showLoading({
            title: "操作中,请稍等..."
        });
        const query = Bmob.Query('scene');
        query.get(this.data.lifeData.objectId).then((res) => {
            console.log("cardInfo.get=====>", res);
            let loves = res.loves;
            if (loves == null) {
                loves = [user];
            } else {
                //判断是否已经报名了
                let size = loves.filter(userItem => userItem.objectId === user.objectId).length;
                if (size <= 0) {
                    loves.push(user);
                } else {
                    let filUsers = loves.filter(userItem => userItem.objectId !== user.objectId);
                    loves.length = 0;
                    loves = filUsers;
                }
            }

            query.set("id", res.objectId);
            query.set("loves", loves);
            query.save().then(res1 => {
                console.log("cardInfo love.save=====>", res1)
                this.updateUserLoves(res);
            }).catch(err => {
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: "操作失败!",
                    icon: 'error'
                })
            });
        });
    },

    updateUserLoves(res) {
        //2.需要将这条数据设置个人用户列表里面，便于计算
        let loves = user.loves;
        if (loves == null || loves.length === 0) {
            loves = [res.objectId];
        } else {
            console.log("cardInfo  res.objectId==========> ", res.objectId);
            console.log("cardInfo  loves==========> ", loves);

            let size = loves.filter(love => love === res.objectId).length;
            if (size === 0) {
                console.log(TAG, "开始收藏");
                loves.push(res.objectId);
            } else {
                //判断是否已经报名了
                let filLove = loves.filter(love => love !== res.objectId);
                loves.length = 0;
                loves = filLove;
                console.log(TAG, "取消收藏");
            }
        }

        const uq = Bmob.Query(Bmob.User.className);
        const objectId = globalData.user.objectId;
        uq.get(objectId).then(res => {
            res.set("loves", loves)
            res.save().then(res => {
                common.updateUser();
                wx.hideLoading();
                wx.showToast({
                    title: "操作成功!",
                    duration: 2000,
                    success: res1 => {
                        this.setData({
                            submitOk: true,
                        });
                        setTimeout(() => wx.navigateBack(), 2000);
                    }
                });
            });
        }).catch(err => {
            console.log("me, 用户信息修改失败=======>", err)
        })
    },

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
        icon: {
            loveOk: '../../imgRes/loveOk.png',
            loveNo: "../../imgRes/loveNo.png"
        },
        loveGroupHeight: 200 + common.topHeight,
        isLove: false,
    },

    onLoad: function (options) {
        let lifeDataStr = decodeURIComponent(options.lifeData);
        let lifeData = JSON.parse(lifeDataStr);

        let query = wx.createSelectorQuery();
        query.select("#pro").boundingClientRect(res => {
                let titleTextWidth = common.screenWidth - 50 - 20;

                this.setData({
                    lifeData: lifeData,
                    titleTextWidth: titleTextWidth,
                });
            }
        ).exec();

        this.isMyLove(lifeData);
    },

    isMyLove(lifeData) {
        let loves = lifeData.loves;
        if (loves === null) return false;
        console.log('isMyLove user============> ', user);

        let v = loves.filter(item => user.objectId === item.objectId).length > 0;
        console.log(v);
        this.setData({
            isLove: v,
        })
        return v;
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



