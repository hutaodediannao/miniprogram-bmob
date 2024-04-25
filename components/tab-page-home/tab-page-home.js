Component({
    data: {
        list: [
            {
                wxKey: '0',
                icon: 'https://img1.baidu.com/it/u=2711267074,2527078454&fm=253&fmt=auto&app=120&f=JPEG?w=1423&h=800',
                title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location:'深圳-宝安区-松岗地铁站E出口',
                name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                personCount: 27,

            },
            {
                wxKey: '1',
                icon: 'https://img2.baidu.com/it/u=2286064893,2631559078&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
                title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location:'深圳-南山区-南山地铁站A出口',
                name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                personCount: 35,

            },
            {
                wxKey: '2',
                icon: 'https://img2.baidu.com/it/u=3048070197,3557748691&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
                title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location:'深圳-罗湖区-罗湖地铁站C出口',
                name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                personCount: 89,

            },
            {
                wxKey: '3',
                icon: 'https://img2.baidu.com/it/u=3474635902,3007408608&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
                title: "5月2号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location:'深圳-光明区-光明地铁站A出口',
                name: '富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.',
                personCount: 34,

            },
        ]
    },

    methods: {
        onItemBuild(evt) {
            console.log('build', evt.detail.index)
        },

        onItemDispose(evt) {
            console.log('dispose', evt.detail.index)
        },
    },
})
