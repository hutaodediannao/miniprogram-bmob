const app = getApp();

Component({
    data: {
        tag: 'tab-page-home',
        list: [],
        triggered: false,//标识下拉刷新状态
        isLoading: false,
        isLoadMore: false,
        isScrollYAbled: true,//控制列表是否可以滑动
        item: {
            wxKey: '1',
            icon: 'https://img2.baidu.com/it/u=2286064893,2631559078&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
            title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
            time: "2019-03-05",
            location: '深圳-南山区-南山地铁站A出口',
            name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
            personCount: 35,
        },
    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            console.log(this.data.tag, 'attached list=====>' + this.data.list.length)
        },
        ready: function () {
            if (this.data.list.length <= 0) {
                this.setData({
                    list: app.globalData.homePageDataList,
                })
            }
            console.log(this.data.tag, 'ready list=====>' + this.data.list.length)
        },
        moved: function () {
            console.log(this.data.tag, 'moved list=====>' + this.data.list.length)
        },
        detached: function () {
            console.log(this.data.tag, 'detached list=====>' + this.data.list.length)
        },
    },

    pageLifetimes: {
        show: function () {
            console.log(this.data.tag, "show()开始执行")
            // 页面被展示
            if (this.data.isLoading) {
                console.log(this.data.tag, 'isLoading为true, 下拉刷新被终止执行')
                return;
            }
            let ls = this.data.list;
            if (ls.length > 0) {
                //表示有数据，不需要重新加载一遍
                return;
            }
            ls.length = 0;
            for (let i = 0; i < 5; i++) {
                ls.push(this.data.item);
            }
            this.setData({
                isLoading: false,
                list: ls,
                triggered: false,
            });
            app.globalData.homePageDataList = this.data.list;
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    },

    methods: {
        //下拉刷新
        refresherrefresh() {
            console.log(this.data.tag, '下拉刷新被触发')
            if (this.data.isLoading) {
                console.log(this.data.tag, 'isLoading为true, 下拉刷新被终止执行')
                return;
            }
            let that = this;

            console.log(this.data.tag, that.data.item);
            setTimeout(v => {
                console.log(this.data.tag, '开始加载刷新数据');
                let ls = that.data.list;
                ls.length = 0;
                for (let i = 0; i < 5; i++) {
                    ls.push(that.data.item);
                }

                that.setData({
                    isLoading: false,
                    list: ls,
                    triggered: false
                });
                app.globalData.homePageDataList = this.data.list;
            }, 2000, 0)
        },

        //底部加载更多
        scrolltolower(evt) {
            console.log(this.data.tag, evt.detail.index)
            if (this.data.isLoadMore) {
                console.log(this.data.tag, this.data.isLoadMore);
                return;
            }
            this.setData({
                isLoadMore: true,
            })
            wx.showLoading({
                title: "加载中...",
                success: res => {
                    this.setData({
                        isScrollYAbled: false,
                    })
                }
            });
            setTimeout(res => {
                let ls = this.data.list;
                for (let i = 1; i < 3; i++) {
                    ls.push(this.data.item);
                }
                this.setData({
                    list: ls,
                    isLoadMore: false,
                    isScrollYAbled: true,
                })
                wx.hideLoading();
                app.globalData.homePageDataList = this.data.list;
            }, 2000);
        },

        dragend(evt) {
            console.log(this.data.tag, evt.detail)


        }
    },
})
