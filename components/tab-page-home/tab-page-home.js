Component({
    properties: {},
    data: {
        radius: false,
    },
    methods: {
        handleTap(e) {
            console.log(e);
        },
        catchTap(e) {
            console.log(e);
        },
        handleSetRadius(checked) {
            this.setData({
                radius: checked,
            });
        },
    }
});
