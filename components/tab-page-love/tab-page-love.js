const globalData = getApp().globalData;
const Bmob = getApp().globalData.Bmob;
const TAG = "tab-page-love";

Component({
    properties: {},
    data: {},
    methods: {
        add(e) {
            // const query = Bmob.Query("scene");
            // query.statTo("where", '{"submitUsers","className":"_User"}');
            // query.find().then(res => {
            //     console.log(res)
            // });

            console.log(TAG, e);

            globalData.Bmob.User.auth().then(res => {
                console.log(TAG, "Bmob.login()===========>" + res);
                console.log(TAG, '一键登陆成功')
                //开始设置用户信息,并保存
                this.globalData.user = res;
            }).catch(err => {
                console.log(TAG, "Bmob.login() err===========>" + err)
                globalData.user = null;
            });


        }
    }
});
