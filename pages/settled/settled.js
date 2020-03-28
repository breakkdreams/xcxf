var http = require('../../utils/httputils');//网络请求
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    idfileList: [],
    licensefileList: [],
    checked: false,
    columns: [],
    //省
    show: false,
    provice_name:'',
    provice_id:'',
    //市
    show_city: false,
    city_name:'',
    city_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: http.baseUrl+'public/plugin/store/api_index/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        if(res.statusCode ==200){
          var result = JSON.parse(res.data)
         const { fileList = [] } = result;
          if(result.code == 200){
            fileList.push({ ...file, url: res.data.fullName });
            that.setData({ fileList });
          }
        }
      }
    });
  },
  id_afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: http.baseUrl+'public/plugin/store/api_index/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        if(res.statusCode ==200){
          var result = JSON.parse(res.data)
        //  const { idfileList = [] } = result;
        const idfileList = that.data.idfileList;
          if(result.code == 200){
            idfileList.push({ ...file, url: res.data.fullName });
            that.setData({ idfileList });
          }
        }
      }
    });
  },
  license_afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: http.baseUrl+'public/plugin/store/api_index/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        if(res.statusCode ==200){
          var result = JSON.parse(res.data)
         const { licensefileList = [] } = result;
          if(result.code == 200){
            licensefileList.push({ ...file, url: res.data.fullName });
            that.setData({ licensefileList });
          }
        }
      }
    });
  },
  deletedThumb(){
    var that = this;
    that.setData({
      fileList:[]
    })
  },
  deletedIdFile(){
    var that = this;
    that.setData({
      idfileList:[]
    })
  },
  deletedLicenseFile(){
    var that = this;
    that.setData({
      licensefileList:[]
    })
  },
  //协议单选框
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  /**
   * 省弹出框
   */
  showPopup() {
    var that = this;
    var params={};
    http.postRequest('public/plugin/store/api_index/getProvinces',params,
    function(res){
      if(res.code == 200){
        var list = res.data;
        var newList = [];
        for (const item of list) {
          var map =  { text: item['name'], id: item['id']};
          newList.push(map);
        }
        that.setData({
          columns:newList
        })
      }
    },
    function(err){

    })
    this.setData({ show: true });
  },
  onConfirm(e) {
    var that = this;
    var provice_name = e.detail.value.text;
    var provice_id = e.detail.value.id;
    that.setData({
      provice_name:provice_name,
      provice_id:provice_id,
    })
    that.setData({ show: false });
  },
  /**
   * 市弹出框
   */
  showPopup_city() {
    var that = this;
    that.setData({
      columns:[]
    })
    var params={
      id:that.data.provice_id
    };
    http.postRequest('public/plugin/store/api_index/getCitys',params,
    function(res){
      if(res.code == 200){
        var list = res.data;
        var newList = [];
        for (const item of list) {
          var map =  { text: item['name'], id: item['id']};
          newList.push(map);
        }
        that.setData({
          columns:newList
        })
      }
    },
    function(err){

    })
    this.setData({ show_city: true });
  },
  onConfirm_city(e) {
    var that = this;
    var city_name = e.detail.value.text;
    var city_id = e.detail.value.id;
    that.setData({
      city_name:city_name,
      city_id:city_id,
    })
    that.setData({ show_city: false });
  },

  onClose() {
    this.setData({ show: false,show_city: false });
  },
  onCancel() {
    this.setData({ show: false,show_city: false });
  },
})