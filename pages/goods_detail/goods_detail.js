// index/details.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    goods_info: { goods_id: 1, goods_title: "商品标题1", goods_price: '100', goods_yunfei: 0, goods_kucun: 100, goods_xiaoliang: 1, content:'<p style="text-align: center;"><br/><img src="https://img.alicdn.com/imgextra/i3/1035464074/O1CN01DWZpoc1fxwA1TO9f4_!!1035464074.jpg"/></p>'},
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],
    article_content:'',
  },
 
 
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist// 需要预览的图片http链接列表  
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var article_content = this.data.goods_info.content;
    article_content = article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;" ')
    .replace(/<section/g, '<div')
    .replace(/\/section>/g, '\div>');
    
    this.setData({
      article_content:article_content
    })
    console.log(article_content);
  },
  backPage:function(){
    wx.navigateBack({
      delta: 1
    })
  }
})