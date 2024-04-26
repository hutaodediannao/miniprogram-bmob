Component({
    data: {
        list: [
            {
                wxKey: '0',
                icon: 'https://img1.baidu.com/it/u=2711267074,2527078454&fm=253&fmt=auto&app=120&f=JPEG?w=1423&h=800',
                title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location: '深圳-宝安区-松岗地铁站E出口',
                name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                personCount: 27,

            },
        ],
        triggered: false,//标识下拉刷新状态
        isLoading: false,
    },

    item: {
        wxKey: '1',
        icon: 'https://img2.baidu.com/it/u=2286064893,2631559078&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
        title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
        time: "2019-03-05",
        location: '深圳-南山区-南山地铁站A出口',
        name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
        personCount: 35,

    },

    methods: {
        refresherrefresh() {
            console.log('refresherrefresh', '下拉刷新被触发')
            if (this.data.isLoading) {
                console.log('refresherrefresh', 'isLoading为true, 下拉刷新被终止执行')
                return;
            }
            let that = this;
            setTimeout(v => {
                    console.log('refresherrefresh', v);
                    let ls = that.data.list;
                    ls.push({
                        wxKey: '1',
                        icon: 'https://img2.baidu.com/it/u=2286064893,2631559078&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
                        title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                        time: "2019-03-05",
                        location: '深圳-南山区-南山地铁站A出口',
                        name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                        personCount: 35,
                    });

                    that.setData({
                        isLoading: false,
                        list: ls,
                        triggered:false,
                    })
                }
                , 2000, 0)
        },

        scrolltolower(evt) {
            console.log('scrolltolower', evt.detail.index)


        }
    },
})
