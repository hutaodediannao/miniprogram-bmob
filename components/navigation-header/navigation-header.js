
let nh = require('../../util/base')

Component({
    properties: {
        title:{
            type: String,
            value:'主页'
        },
        showBack:{
            type:Boolean,
            value:true
        },
        backIconUrl:{
            type:String,
            value:'/imgRes/back.png'
        }
    },
    data: {
        height: nh.nh+nh.sh,
        pt:nh.sh,
    },
    methods: {
        back(){
            wx.navigateBack()
        }
    }
});
