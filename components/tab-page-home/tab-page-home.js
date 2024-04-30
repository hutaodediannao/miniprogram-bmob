const app = getApp();
const Bmob = getApp().globalData.Bmob;
const user = getApp().globalData.user;
const TAG = "tab-page-home";

Component({
    data: {
        tag: 'tab-page-home',
        list: [],
        triggered: false,//标识下拉刷新状态
        isLoading: false,
        isLoadMore: false,
        isScrollYAbled: true,//控制列表是否可以滑动
        limit: 10,
        skipPage: 0,
        isNoMore: false,
        isShow: false,
        lifeData: null,
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
            if (this.data.list == null || this.data.list.length <= 0) {
                this.loadListNetData(true);
            }
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
        callback(evt) {
            let submitOk = evt.detail.submitOk;
            if (submitOk != null && submitOk === true) {
                console.log("主页列表收到提交事件参数:callback=====>", submitOk);
                this.refresherrefresh()
            } else {
                console.log("主页列表收到提交事件参数:callback=====>", "null");
            }
        },

        refresherrefresh() {
            console.log(this.data.tag, '下拉刷新被触发')
            if (this.data.isLoading) {
                console.log(this.data.tag, 'isLoading为true, 下拉刷新被终止执行')
                return;
            }
            this.loadListNetData(true);
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
            });
            this.loadListNetData(false);
        },

        dragend(evt) {
            console.log(this.data.tag, evt.detail)
        },

        loadListNetData(isRefresh = false) {
            wx.showLoading({
                title: "加载中...",
                success: res => {
                    this.setData({
                        isScrollYAbled: false,
                    })
                }
            });
            const query = Bmob.Query('scene');
            if (isRefresh) {
                query.limit(this.data.limit);
                query.skip(0);
                console.log("请求参数this.data.skipPage========>", 0);
            } else {
                query.limit(this.data.limit);
                query.skip((this.data.skipPage + 1) * this.data.limit);
                console.log("请求参数this.data.skipPage========>", (this.data.skipPage + 1) * this.data.limit);
            }

            query.find().then(res => {
                // 返回成功
                if (isRefresh) {
                    console.log(this.data.tag, '开始刷新第一页数据');
                } else {
                    console.log(this.data.tag, '开始加载更多页数据');
                }
                console.log(res);

                let ls = this.data.list;
                if (isRefresh) {
                    ls.length = 0;//先清除列表数据
                    if (res != null && res.length > 0) {
                        let len = res.length;

                        console.log("len=======>", len);
                        console.log("limit=======>", this.data.limit);

                        for (let i = 0; i < len; i++) {
                            ls.push(res[i]);
                        }
                        this.setData({
                            list: ls,
                            skipPage: 0,
                            isNoMore: len < this.data.limit,
                        });
                    } else {
                        this.setData({
                            isNoMore: true,
                        });
                    }
                    this.setData({
                        isLoading: false,
                        triggered: false,
                        isScrollYAbled: true,
                    });
                } else {
                    if (res != null && res.length > 0) {
                        let len = res.length;
                        for (let i = 0; i < len; i++) {
                            ls.push(res[i]);
                        }
                        this.setData({
                            list: ls,
                            skipPage: this.data.skipPage + 1,
                            isNoMore: len < this.data.limit,
                        });
                    } else {
                        wx.showToast({
                            title: "没有更多数据了",
                            duration: 2000,
                        })
                        this.setData({
                            isNoMore: true,
                        })
                    }
                    this.setData({
                        isLoadMore: false,
                        isLoading: false,
                        triggered: false,
                        isScrollYAbled: true,
                    })
                }

                app.globalData.homePageDataList = this.data.list;
                wx.hideLoading();
            });
        },

        triggerDialog(evt){
            this.setData({
                isShow: true,
                lifeData: evt.detail,
            });
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

        submit() {
            wx.showLoading({
                title: "提交中,请稍等..."
            });
            const query = Bmob.Query('scene');
            query.get(this.data.lifeData.objectId).then((res) => {
                console.log("cardInfo.get submitUsers=====>", res.submitUsers);
                console.log("cardInfo.get user=====>", user);
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
                            setTimeout(() => {


                            }, 2000);
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
    },
})
