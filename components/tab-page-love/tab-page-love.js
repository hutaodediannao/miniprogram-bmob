const Bmob = getApp().globalData.Bmob;

Component({
    properties: {},
    data: {},
    methods: {
        add(e) {
            const query = Bmob.Query("device");
            query.find().then(res => {
                console.log("查询Bmob数据结果为======> ", res)
            });

        }
    }
});
