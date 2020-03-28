//app.js
App({

  onLaunch: function() {
    var that = this;

    var uid = wx.getStorageSync('uid');
    if(uid==null || uid =='' || uid == undefined){
      wx.navigateTo({
        url: '/pages/login/login',
      })
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
    city:''
  }
  
})