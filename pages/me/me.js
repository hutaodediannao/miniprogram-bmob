const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;

Page({
    bindPickerChange(evt) {
        console.log("bindPickerChange==========> ", evt.detail.value);
        let value = parseInt(evt.detail.value) + 1;
        console.log("value ==============> ", value);
        this.changeUserInfo("gender", value);
    },

    inputNickEvent(evt) {
        console.log("inputNickEvent==========> ", evt.detail.value);
        this.changeUserInfo("nickName", evt.detail.value);
    },

    onChooseAvatar(e) {
        //修改图片
        let avatarUrl = e.detail.avatarUrl;
        this.changeUserInfo("avatarUrl", avatarUrl);
    },

    //更新用户信息UI
    updateUser() {
        console.log("updateUser");
        const query = Bmob.Query(Bmob.User.className);
        const objectId = globalData.user.objectId;
        query.get(objectId).then(res => {
            if (res) {
                console.log(this.data.tag + " ,res.save().then=======> ", res)
                this.setData({
                    user: res,
                });

                //修改全局变量
                globalData.user = res;
            }
        });
    },

    //选择生日
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        globalData.user.birthday = e.detail.value;
        this.changeUserInfo("birthday", e.detail.value);
    },

    changeUserInfo(paramKey, paramValue) {
        const query = Bmob.Query(Bmob.User.className);
        const objectId = globalData.user.objectId;
        query.get(objectId).then(res => {
            res.set(paramKey, paramValue)
            res.save().then(res => {
                wx.showToast({
                    title: '修改成功',
                    duration: 2000,
                });
                this.updateUser();
            });
        }).catch(err => {
            console.log("me, 用户信息修改失败=======>", err)
        })
    },

    onShow() {
        console.log(this.data.tag, "onShow()");
        console.log(this.data.tag + ", this.data.user=====>", this.data.user);
        this.setData({
            user: globalData.user,
        });
    },

    onReady() {
        console.log(this.data.tag, "onReady()");
    },

    onUnload() {
        console.log(this.data.tag, "onUnload()");
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('getData', {name: 'zhangsan', addr: '北京市'})
    },

    data: {
        tag: "me",
        title: '个人资料',
        user: globalData.user,
        array: ['男', '女'],

    }
});
