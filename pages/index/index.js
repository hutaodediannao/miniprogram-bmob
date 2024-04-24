Page({
    data: {
        tabs: [
            {
                icon: '/imgRes/home.png',
                activeIcon: '/imgRes/homeS.png',
                text: '首页',
            },
            {
                icon: '/imgRes/Scene.png',
                activeIcon: '/imgRes/SceneS.png',
                text: '收藏',
            },
            {
                icon: '/imgRes/me.png',
                activeIcon: '/imgRes/meS.png',
                text: '我的',
            },
        ],
        current: 0,
        title: '',
        backIconUrl:'/imgRes/lv.png',
    },
    handleChange(index) {
        let pos = index.detail;
        console.log(pos);
        this.setData({current: pos, title: this.getTitle(pos)});
    },

    getTitle(pos) {
        return this.data.tabs[pos].text;
    },

    onShow() {
        let pos = 0;
        if (this.data.tabs.length > 0) {
            this.setData({current: pos, title: this.getTitle(pos)});
        }
    }
});
