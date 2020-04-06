const app = getApp();
var http = require('../../utils/httputils');//网络请求
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    message_list:[],
    loading:false,
    page: 1,
    pages: 0,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.fetchMessageList(1);
  },
  setMessage(e){
    var message = e.detail
    this.setData({
      message:message
    })
  },
  send_message(){
    var that = this;
    var params = {
      store_id:wx.getStorageSync('uid'),
      message:that.data.message
    };
    http.postRequest('public/plugin/store/api_index/addMessage',params,function(res){
      if(res.code == 200){
        app.globalData.totify({ type: 'primary', message: res.message });
        that.setData({
          message:''
        })
        that.onShow();
      }
    },function(err){})
  },
  // 下拉触底，先判断是否有请求正在进行中
  onReachBottom() {
    var that = this;
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!that.loading && that.data.page < that.data.pages) {
      that.fetchMessageList(that.data.page + 1)
    }else{
      app.globalData.totify({ type: 'warning', message: '暂无更多' ,duration: 1000});
    }
  },
   // 上拉刷新
  onPullDownRefresh() {
    var that = this;
    if (!that.loading) {
      that.fetchMessageList(1,true);
    }
  },

  fetchMessageList(pageNo,override) {
    var that = this;
    that.loading = true;
    var params = {
      store_id:wx.getStorageSync('uid'),
      page:pageNo
    };
    http.postRequest('public/plugin/store/api_index/getMessage',params,function(res){
      if(res.code == 200){
        const articles = res.data.data;
        that.setData({
          message_list:override ? articles : that.data.message_list.concat(articles),
          page: res.data.current_page,     //当前的页号
          pages: res.data.last_page,  //总页数
        })
      }
    },function(err){})
    that.loading = false;
    wx.stopPullDownRefresh()
  }

})