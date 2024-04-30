const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const TAG = "tab-page-love";

Component({
    properties: {},
    data: {
        current: 0,
        items: [
            {
                title: '水果',
                subTitle: '描述文案',
                content: '西瓜',
            },
            {
                title: '蔬菜',
                subTitle: '描述文案',
                content: '西红柿',
            },
            {
                title: '动物',
                subTitle: '描述文案',
                content: '蚂蚁',
            },
        ],
    },

    methods: {
        onSwipeChange(e) {
            this.setData({
                current: e.detail.current,
            });
        },
        onChange(current) {
            current = current.detail;
            this.setData({
                current,
            });
        },
    }
});
