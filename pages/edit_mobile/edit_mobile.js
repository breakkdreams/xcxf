var http = require('../../utils/httputils'); //网络请求
const app = getApp();
Page({
  data: {
    time: '发送验证码',
    disabled: false,
    currentTime: 61,
    mobile: '',
    mobile_code: '',
  },
  onLoad: function () {

  },
  onChangeMobile(event) {
    this.setData({
      mobile: event.detail
    })
  },
  onChangeMobileCode(event) {
    this.setData({
      mobile_code: event.detail
    })
  },
  //发送验证码
  sendMessage() {
    var that = this;
    if (!that.data.disabled) {
      var params = {
        mobile: that.data.mobile,
      };
      http.postRequest('public/plugin/notice/api_index/smsCode', params, function (res) {
        if (res.code == 200) {
          app.globalData.totify({
            type: 'primary',
            message: '发送成功'
          });
          var currentTime = that.data.currentTime
          var interval = setInterval(function () {
            currentTime--;
            that.setData({
              time: currentTime + '秒',
              disabled: true
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新发送',
                currentTime: 61,
                disabled: false
              })
            }
          }, 1000)
        } else {
          app.globalData.totify({
            type: 'warning',
            message: res.message
          });
        }
      }, function (err) {

      })
    }
  },
  //绑定手机号
  bind_phone: function () {
    var that = this;
    //插入登录的用户的相关信息到数据库
    var params = {
      id: wx.getStorageSync('uid'),
      mobile: that.data.mobile,
      code: that.data.mobile_code,
    }
    http.postRequest('public/plugin/member/api_index/changeMobile', params,
      function (res) {
        if (res.code == 200) {
          app.globalData.totify({
            type: 'primary',
            message: res.message
          });
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          app.globalData.totify({
            type: 'warning',
            message: res.message
          });
        }
      },
      function (err) {

      })

  },

})