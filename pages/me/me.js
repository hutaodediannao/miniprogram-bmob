Page({

    back() {
        wx.navigateBack()

    },

    data: {},

    onLoad: function (options) {

    },

    show(){
        wx.showModal({
            title:'这是头部',
            content:'这是内容',
            cancel:true,
            success:true,
            fail:true,
            complete:true,
            cancelText:'关闭',
            cancelColor: "#ff0000",
            confirmColor: '#00ff00',
        })
    }
});
