var http = require('../../utils/httputils');//网络请求
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountname:'',
    tphone:'',
    account:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChangeAccountName(e){
    this.setData({
      accountname:e.detail
    })
  },
  onChangePhone(e){
    this.setData({
      tphone:e.detail
    })
  },
  onChangeAccount(e){
    this.setData({
      account:e.detail
    })
  },
  add_card(){
    var that = this;
    var params={
      tid:3,
      uid:wx.getStorageSync('uid'),
      account:that.data.account,
      accountname:that.data.accountname,
      tphone:that.data.tphone,
      bank_type:1
    };
    http.postRequest('public/plugin/fund/api_index/addaccount',params,function(res){
      console.log(res);
      if(res.code == 200){
        app.globalData.totify({ type: 'primary', message: res.message });
        wx.navigateBack({
          delta: 1
        })
      }else{
        app.globalData.totify({ type: 'warning', message: res.message });
      }
    },function(err){})
  }
})