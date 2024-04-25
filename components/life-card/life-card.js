Component({
    properties: {
        lifeData: {
            type: Object,
            value: null
        }
    },
    data: {
        textWidth() {
            let textWidth = wx.getWindowInfo().screenWidth - 10 * 4 - 160 - 10;
            console.log("textWidth =======>", textWidth);
            return textWidth;
        },
        cardWidth(){
            return wx.getWindowInfo().screenWidth - 10*2;
        }
    },
    methods: {}
});
