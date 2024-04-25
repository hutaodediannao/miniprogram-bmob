Component({
    data: {
        list: [
            {
                wxKey: '0',
                icon: 'https://img1.baidu.com/it/u=2711267074,2527078454&fm=253&fmt=auto&app=120&f=JPEG?w=1423&h=800',
                title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
                time: "2019-03-05",
                location:'深圳-宝安区-松岗地铁站E出口新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄',
                name:'富春江徒步新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄富春江七里扬帆,是江南水乡的一道独特风景线.'
            },

            // {
            //     wxKey: '1',
            //     icon: 'https://img1.baidu.com/it/u=3298987557,1372642473&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
            //     title: "5月1号 新手局,富春江七里扬帆,是江南水乡的一道独特风景线.此段江面狭窄...",
            //     time: "2019-03-05",
            //     location:'深圳-宝安区-松岗地铁站E出口',
            //     name:'富春江徒步'
            // }
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
