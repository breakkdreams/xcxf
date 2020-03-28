const app = getApp();
var http = require('../../utils/httputils');//网络请求
import Toast from '../..//dist/toast/toast';
Page({
  data: {
    swiperList: [],
    goodsList:[{
      image:'http://img1.imgtn.bdimg.com/it/u=3379232673,1367872826&fm=26&gp=0.jpg',
      title:'商品名称',
      newPrice:'120',
      oldPrice:'120'
    },{
      image:'http://img1.imgtn.bdimg.com/it/u=3379232673,1367872826&fm=26&gp=0.jpg',
      title:'商品名称',
      newPrice:'120',
      oldPrice:'120'
    },{
      image:'http://img1.imgtn.bdimg.com/it/u=3379232673,1367872826&fm=26&gp=0.jpg',
      title:'商品名称',
      newPrice:'120',
      oldPrice:'120'
    }],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      name: '帮助'
    }],
    dataList:[
      {
        goods_id:1,
        goods_title:'商品标题1',
        goods_img:'http://img1.imgtn.bdimg.com/it/u=512440107,1954173292&fm=11&gp=0.jpg',
        goods_xiaoliang:'2019/12/03 12:20:22',
        goods_price:'产品简介产品简介产品简介产品简介'
      },{
        goods_id:1,
        goods_title:'商品标题2',
        goods_img:'http://img1.imgtn.bdimg.com/it/u=512440107,1954173292&fm=11&gp=0.jpg',
        goods_xiaoliang:'2019/12/03 12:20:22',
        goods_price:'产品简介产品简介产品简介产品简介'
      }
    ],
    TabCur: 0,
    scrollLeft:0,
    city:''
  },
  onLoad() {
    this.getLocalInfo();
  },
  //获取定位信息
  getLocalInfo(){
    var that = this;
    wx.getSetting({
      complete: (res) => {
        if (res.authSetting['scope.userLocation'] == undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                that.getCity();
              }
            }
          })
        }else{
          that.getCity();
        }
      },
    })
  },
  //通过百度地图获取地理位置
  getCity(){
    var that = this;
    wx.getLocation({
      success: function(res) {
        var longitude = res.longitude
        var latitude = res.latitude
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=YVuw1Kqn5F7HAOonqDY7HfxnpBWRzVWv&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
          data:{},
          header: {
            'Content-Type': 'application/json'
          },
          success:function(res){
            var city = res.data.result.addressComponent.city
            that.setData({
              city:city
            })
          }
        })
      },
    })
  },
  //跳转商品详情
  detailPage(){
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail',
    })
  },
  //跳转到城市选择
  cityPage(){
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  //滑动分类选择
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  onShow(){
    this.getSwiperList();
  },
  //获取轮播图
  getSwiperList(){
    var that= this;
    var prams = {}
    http.postRequest("public/plugin/carousel/api_index/getCarousels", prams,
      function(res) {
        console.log(res)
        if(res.code==200){
          that.setData({
            swiperList:res.data
          })
        }
      },
      function(err) {
        // Toast.fail(err.message);
      })
  },
  //轮播图跳转
  bannerLink(e){
    var url_link = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages/web_view/web_view?url_link='+url_link,
    })
  },
  //跳转商家入驻
  settled(){
    wx.navigateTo({
      url: '/pages/settled/settled',
    })
  }
})