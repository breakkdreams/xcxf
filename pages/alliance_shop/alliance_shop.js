// pages/alliance_shop/alliance_shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

  },
  //跳转加入联盟
  join_alliance(){
    wx.navigateTo({
      url: '/pages/alliance_join/alliance_join',
    })
  }
})