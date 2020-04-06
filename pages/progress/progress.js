var app = getApp();
var http = require('../../utils/httputils');//网络请求
Page({

  /**
   * 页面的初始数据
   */
  data: {
      status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var params = {
      id:wx.getStorageSync('uid')
    }
    http.postRequest('public/plugin/store/api_index/getStore',params,
    function(res){
      console.log(res)
      if(res.code == 200){
        that.setData({
          status:res.data.status
        })
      }
    })
  },
  returnApply(){
    wx.redirectTo({
      url: '/pages/settled/settled',
    })
  },
  returnBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})