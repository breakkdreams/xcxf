var http = require('../../utils/httputils'); //网络请求
import Toast from '../..//dist/toast/toast';
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: ''
  },
  onLoad: function () {
    var that = this;
    wx.login({
      complete: (res) => {
        that.setData({
          code: res.code
        })
      },
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo(res);
              //用户已经授权过
              wx.switchTab({
               url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      var params = {
        code: that.data.code,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        city: e.detail.userInfo.city,
        country: e.detail.userInfo.country,
        gender: e.detail.userInfo.gender,
        language: e.detail.userInfo.language,
        province: e.detail.userInfo.province,
      }
      http.postRequest('public/plugin/member/apiIndex/wechatXcxLogin', params,
        function (res) {
          if(res.code==200){
            wx.setStorageSync('uid', res.data.uid);
          }else{
            Toast.err('获取用户uid失败')
          }
        },
        function (err) {

        })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function (e) {
    if (e.userInfo) {
      var that = this;
      //插入登录的用户的相关信息到数据库
      var params = {
        code: that.data.code,
        nickName: e.userInfo.nickName,
        avatarUrl: e.userInfo.avatarUrl,
        city: e.userInfo.city,
        country: e.userInfo.country,
        gender: e.userInfo.gender,
        language: e.userInfo.language,
        province: e.userInfo.province,
      }
      http.postRequest('public/plugin/member/apiIndex/wechatXcxLogin', params,
        function (res) {
          //保存到缓存
          if(res.code==200){
            wx.setStorageSync('uid', res.data.uid);
          }else{
            Toast.err('获取用户uid失败')
          }
        },
        function (err) {

        })
    }
  },

})