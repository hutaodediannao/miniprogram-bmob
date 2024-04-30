Page({
    data: {
        tabs: [
            {
                icon: '/imgRes/home.png',
                activeIcon: '/imgRes/homeS.png',
                text: '户外野趣',
            },
            {
                icon: '/imgRes/scene.png',
                activeIcon: '/imgRes/sceneS.png',
                text: '报名收藏',
            },
            {
                icon: '/imgRes/me.png',
                activeIcon: '/imgRes/meS.png',
                text: '我的个人',
            },
        ],
        current: 0,
        title: '',
        backIconUrl: '/imgRes/lv.png',
    },
    handleChange(index) {
        console.log('handleChange======> ', index);
        let pos = index.detail;
        console.log(pos);
        this.setData({current: pos, title: this.getTitle(pos)});
    },

    getTitle(pos) {
        return this.data.tabs[pos].text;
    },

    onShow() {
        //首次加载头部title
        if (this.data.title === '') {
            console.log("首次加载: onShow()=====>");
            let pos = 0;
            if (this.data.tabs.length > 0) {
                this.setData({current: pos, title: this.getTitle(pos)});
            }
        } else {
            console.log("不是首次加载: onShow()不做处理");
        }
    }
});
