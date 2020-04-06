// pages/store_home/store_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //页面跳转
  turnPage(e){
    var pages = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: pages,
    })
  }
})