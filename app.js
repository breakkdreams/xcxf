//app.js
import Notify from './dist/notify/notify';
var http = require('./utils/httputils');//网络请求
App({

  onLaunch: function() {
    var that = this;

    var uid = wx.getStorageSync('uid');
    if(uid==null || uid =='' || uid == undefined){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }else{
      //获取用户信息
      var params = {
        uid:wx.getStorageSync('uid')
      };
      http.postRequest('public/plugin/member/api_index/personalData',params,function(res){
        console.log(res)
        if(res.code==200){
          if(res.data.mobile==null || res.data.mobile==''){
            wx.redirectTo({
              url: '/pages/edit_mobile/edit_mobile',
            })
          }
        }
      },function(err){})
    }

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        that.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          that.globalData.Custom = capsule;
        	that.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	that.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    city:'',
    totify:Notify
  }
  
})