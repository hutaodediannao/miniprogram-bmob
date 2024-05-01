const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const TAG = "tab-page-love";

Component({
    properties: {},
    data: {
        current: 0,
        radios: [
            '我的报名',
            '我的收藏'
        ],
        myLoveList: [],
        mySubmitList: []
    },

    methods: {
        tabClick(evt) {
            console.log('tabClick', evt.detail);
            this.setData({
                current: evt.detail,
            });
        },

        onSwipeChange(evt) {
            console.log('onSwipeChange', evt.detail);
            this.setData({
                current: evt.detail.current,
            });
        },

        onChange(current) {
            current = current.detail;
            this.setData({
                current,
            });
        },

        loadListNetData() {
            wx.showLoading({
                title: "加载中..."
            });
            const query = Bmob.Query('scene');
            query.find().then(res => {
                // 返回成功
                console.log(res);
                let ls = this.data.myLoveList;
                ls.length = 0;
                if (res != null && res.length > 0) {
                    let len = res.length;
                    for (let i = 0; i < len; i++) {
                        ls.push(res[i]);
                    }
                    this.setData({
                        myLoveList: ls,
                        mySubmitList: ls,
                    });
                }
                wx.hideLoading();
            });
        },
    },

    pageLifetimes: {
        show: function () {
            console.log(TAG, "show()开始执行");
            // 页面被展示
            // if (this.data.myLoveList == null || this.data.myLoveList.length <= 0) {
            // }
            this.loadListNetData();
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            console.log(TAG, 'attached list=====>');
        },
        ready: function () {
            console.log(TAG, 'ready list=====>');
            this.loadListNetData();
        },
        moved: function () {
            console.log(TAG, 'moved list=====>');
        },
        detached: function () {
            console.log(TAG, 'detached list=====>');
        },
    },

});
