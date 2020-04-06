var http = require('../../utils/httputils');//网络请求
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    memberInfo:'',
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '推广链接'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '商家入驻'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '我的钱包'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '联系客服'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '我的团队'
    }],
  },
  methods: {
    onLoad(){
      var that = this;
      var params = {
        uid:wx.getStorageSync('uid')
      };
      http.postRequest('public/plugin/member/api_index/personalData',params,function(res){
        console.log(res)
        if(res.code==200){
          that.setData({
            memberInfo:res.data
          })
        }
      },function(err){

      })
    }
  }
})