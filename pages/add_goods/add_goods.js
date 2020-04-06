var http = require('../../utils/httputils');//网络请求
const app = getApp();
Page({
  data: {
    category_show: false,
    time_show: false,
    classList: [],
    category_name: '请选择产品分类',
    time_name: '请选择截止时间',
    sort: {},
    sortList: [{
        values: "",
        className: "column1"
      },
      {
        values: "",
        className: "column2",
      }
    ],
    gcatid:'',
    licensefileList: [],//主图
    idfileList: [],//相册
    //时间
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 1, 1).getTime(),
    maxDate: new Date(2030, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    overdue_time:'',
    goodsname:'',
    goodsdesc:'',
    marketprice:'',
    shopprice:'',
    commission:'',
    salenum:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var params = {};
    http.postRequest('public/plugin/goods/api_index/getClassifys',params,function(res){
      if(res.code == 200){
        var dataList = res.data;
        for (const i of dataList) {
          const sort = {
            [i.catname]: []
          };
          const classify = {
            id: i.catid,
            name: i.catname,
            child: []
          };
          for (const j of i.data) {
            sort[i.catname].push(j.catname);
            const child = {
              id: j.catid,
              name: j.catname
            };
            classify.child.push(child);
          }
          that.data.classList.push(classify);
          Object.assign(that.data.sort, sort); //将两个对象合并
          var list = [{
              values: "",
              className: "column1"
            },
            {
              values: "",
              className: "column2",
            }
          ];
          list[0].values = Object.keys(that.data.sort);
          list[1].values = that.data.sort[Object.keys(that.data.sort)[0]];
          that.setData({
            sortList: list,
          })
        }
      }
    },function(err){})
  },
  onChangeCategory(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, this.data.sort[value[0]]);
  },
  changeCategoryShow() {
    var that = this;
    that.setData({
      category_show: true
    })
  },
  onCategoryConfirm(e) {
    var that = this;
    var indexs = e.detail.index;
    var values = e.detail.value;
    var category_id = that.data.classList[indexs[0]].id;
    var category_name = values[0];
    if(values[1] != undefined && values[1] != ''){
      category_id = that.data.classList[indexs[0]]['child'][indexs[1]].id;
      category_name = values[1];
    }
    that.setData({
      category_show: false,
      category_name:category_name,
      gcatid:category_id
    })
  },
  //主图
  license_afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: http.baseUrl+'public/plugin/goods/api_index/uploadimg', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { type: 1 },
      success(res) {
        if(res.statusCode ==200){
          var result = JSON.parse(res.data)
          const { licensefileList = [] } = result;
          if(result.code == 0){
            console.log(result);
            licensefileList.push({ ...file, url: result.data.fullName,paths:result.data.src });
            that.setData({ licensefileList });
          }
        }
      }
    });
  },
  deletedLicenseFile(){
    var that = this;
    that.setData({
      licensefileList:[]
    })
  },
  //相册
  id_afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: http.baseUrl+'public/plugin/goods/api_index/uploadimg', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { type: 2 },
      success(res) {
        if(res.statusCode ==200){
          var result = JSON.parse(res.data)
          const idfileList = that.data.idfileList;
          if(result.code == 0){
            idfileList.push({ ...file, url: result.data.fullName,paths:result.data.src });
            that.setData({ idfileList });
          }
        }
      }
    });
  },
  deletedIdFile(){
    var that = this;
    that.setData({
      idfileList:[]
    })
  },
  //时间
  changeTimeShow(){
    this.setData({
      time_show: true,
    })
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onClose(){
    this.setData({
      category_show: false,
      time_show: false,
    })
  },
  onTimeConfirm(e){
    var time_str = e.detail;
    var time_format = formatDateTime(time_str);
    this.setData({
      overdue_time:time_format,
      time_name:time_format,
      time_show: false,
    })
  },
  //各个输入框
  onChangeName(e){
    this.setData({
      goodsname:e.detail
    })
  },
  onChangeDesc(e){
    this.setData({
      goodsdesc:e.detail
    })
  },
  onChangeMarketprice(e){
    this.setData({
      marketprice:e.detail
    })
  },
  onChangeMarketprice(e){
    this.setData({
      marketprice:e.detail
    })
  },
  onChangeShopprice(e){
    this.setData({
      shopprice:e.detail
    })
  },
  onChangeCommission(e){
    this.setData({
      commission:e.detail
    })
  },
  onChangeSalenum(e){
    this.setData({
      salenum:e.detail
    })
  },
  //添加商品
  add_shop(){
    var that = this;
    var license = '';
    var id_card_image = [];
    if(that.data.licensefileList.length>0){
      license = that.data.licensefileList[0].paths
    }
    if(that.data.idfileList.length>0){
      for (const item in that.data.idfileList) {
        if(item){
          id_card_image.push(that.data.idfileList[item].paths)
        }
      }
    }
    var params={
      goodsname:that.data.goodsname,
      goodsimg:license,//主图
      gcatid:that.data.gcatid,
      goodsdesc:that.data.goodsdesc,
      goodsalbum:that.data.id_card_image,
      marketprice:that.data.marketprice,
      shopprice:that.data.shopprice,
      commission:that.data.commission,
      salenum:that.data.salenum,
      overdue_time:that.data.overdue_time,
      shopid:wx.getStorageSync('uid'),
    };
    http.postRequest('public/plugin/goods/api_index/addGoods',params,function(res){
      console.log(res)
      if(res.code == 200){
        app.globalData.totify({ type: 'warning', message: res.message });
        wx.navigateBack({
          delta: 1
        })
      }else{
        app.globalData.totify({ type: 'warning', message: res.message });
      }
    },function(err){})
  }

})

function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  return y + '-' + m + '-' + d+' '+h+':'+minute;
};
