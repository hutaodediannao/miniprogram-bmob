Component({
    properties: {
        lifeData: {
            type: Object,
            value: null
        }
    },
    data: {
        timeIcon: 'ClockCircleOutline',
        locationIcon: 'EnvironmentOutline',
        nameIcon: 'FlagOutline',
        personIcon: 'TeamOutline',

        textWidth() {
            let textWidth = wx.getWindowInfo().screenWidth - 10 * 4 - 160 - 10;
            return textWidth;
        },
        cardWidth() {
            return wx.getWindowInfo().screenWidth - 10 * 2;
        }
    },
    methods: {
        tap() {
            wx.navigateTo({
                url:'/pages/detail/detail'
            })

        }
    }
});
