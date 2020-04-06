const app = getApp();
var http = require('../../utils/httputils'); //网络请求
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    width: 750,
    loading: false,
    page: 1,
    pages: 0,
    goods_list: [],
    search_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;
        // 算出比例
        let ratio = 750 / clientWidth;
        // 算出高度(单位rpx)
        let height = clientHeight * ratio;
        // 设置高度
        that.setData({
          height: height - 1000,
        });
      }
    });
  },

  onShow: function () {
    var that = this;
    that.setData({
      goods_list: []
    })
    that.fetchList(1);
  },

  // 下拉触底，先判断是否有请求正在进行中
  onReachBottom() {
    var that = this;
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!that.loading && that.data.page < that.data.pages) {
      that.fetchList(that.data.page + 1)
    } else {
      app.globalData.totify({
        type: 'warning',
        message: '暂无更多',
        duration: 1000
      });
    }
  },
  // 上拉刷新
  onPullDownRefresh() {
    var that = this;
    if (!that.loading) {
      that.fetchList(1, true);
    }
  },
  fetchList(pageNo, override) {
    var that = this;
    that.loading = true;
    var params = {
      store_id: wx.getStorageSync('uid'),
      page: pageNo,
      goodsname: that.data.search_name
    };
    http.postRequest('public/plugin/goods/api_index/getGoodss', params, function (res) {
      if (res.code == 200) {
        const list = res.data.data;
        that.setData({
          goods_list: override ? list : that.data.goods_list.concat(list),
          page: res.data.current_page, //当前的页号
          pages: res.data.last_page, //总页数
        })
      }
    }, function (err) {})
    that.loading = false;
    wx.stopPullDownRefresh()
  },
  add_btn() {
    wx.navigateTo({
      url: '/pages/add_goods/add_goods',
    })
  },
  bindImgError(e) {
    var index = parseInt(e.currentTarget.dataset.id);
    this.setData({
      [`goods_list[${index}].goodsimg`]: "/images/empty.png",
    })
  },
  bind_name(e){
    this.setData({
      search_name:e.detail.value
    })
  },
  search_goods(){
    var that = this;
    if (!that.loading) {
      that.fetchList(1, true);
    }
  }
})