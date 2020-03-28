// pages/webView/web_view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlLink:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var urlLink = options.url_link;
    that.setData({
      urlLink: urlLink
    })
  },
})