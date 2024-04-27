// app.js
import Bmob from "hydrogen-js-sdk";

App({
    onLaunch: function () {
        Bmob.initialize("d85a151cf3edf669", "199009");
        this.globalData = {
            homePageDataList: [],
            Bmob: Bmob,
            user: null,
        }

        this.globalData.Bmob.User.auth().then(res => {
            console.log("Bmob.login()===========>", res);
            console.log('一键登陆成功')
            //开始设置用户信息,并保存
            this.globalData.user = res;
        }).catch(err => {
            console.log("Bmob.login() err===========>", err)
            this.globalData.user = null;
        });
    }
})
