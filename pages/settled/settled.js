var http = require('../../utils/httputils');//网络请求
const app = getApp();
import Notify from '../../dist/notify/notify';
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
    city_id:'',
     //区
     show_area: false,
     area_name:'',
     area_id:'',
     //协议显影
     agree_show:false,
     agree_content:'',
     customBar:'',
     //参数
     name:'',
     license_code:'',
     id_name:'',
     id_card:'',
     location:'',
     content:'',

     store_status:'',

     tag_1:'',
     tag_2:'',
     tag_3:'',
     name_1:'',
     name_2:'',
     name_3:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreInfo();
    this.setData({
      customBar:app.globalData.CustomBar
    })
  },
  getStoreInfo(){
    var that = this;
    var params = {
      id:wx.getStorageSync('uid')
    }
    http.postRequest('public/plugin/store/api_index/getStore',params,function(res){
      if(res.code == 200){
        if(res.data.status>0){
          const licensefileList = [];
          licensefileList.push({url: res.data.license });
          const fileList = [];
          fileList.push({url: res.data.thumb });
          const idfileList = [];
          for (const item of res.data.id_image) {
            idfileList.push({url: item });
          }
          that.setData({
            fileList:fileList,
            idfileList:idfileList,
            licensefileList:licensefileList,
            name:res.data.name,
            license_code:res.data.license_code,
            id_name:res.data.id_name,
            id_card:res.data.id_code,
            location:res.data.location,
            content:res.data.content,
            store_status:res.data.status,
            provice_name:res.data.name_1,
            city_name:res.data.name_2,
            area_name:res.data.name_3,
            tag_1:res.data.tag_1,
            tag_2:res.data.tag_2,
            tag_3:res.data.tag_3,
            provice_id:res.data.province,
            city_id:res.data.city,
            area_id:res.data.area,
          })
        }
      }
    })
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
            fileList.push({ ...file, url: result.data.fullName });
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
            idfileList.push({ ...file, url: result.data.fullName });
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
            licensefileList.push({ ...file, url: result.data.fullName });
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
    console.log(e)
    var that = this;
    var provice_name = e.detail.value.text;
    var tag_1 = e.detail.index;
    var provice_id = e.detail.value.id;
    if(provice_id!=that.data.provice_id){
      that.setData({
        city_name:'',
        city_id:'',
        area_name:'',
        area_id:'',
      })
    }
    that.setData({
      provice_name:provice_name,
      provice_id:provice_id,
      tag_1:tag_1,
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
    var tag_2 = e.detail.index;
    if(city_id!=that.data.city_id){
      that.setData({
        area_name:'',
        area_id:'',
      })
    }
    that.setData({
      city_name:city_name,
      city_id:city_id,
      tag_2:tag_2,
    })
    that.setData({ show_city: false });
  },
   /**
   * 区弹出框
   */
  showPopup_area() {
    var that = this;
    that.setData({
      columns:[]
    })
    var params={
      id:that.data.city_id
    };
    http.postRequest('public/plugin/store/api_index/getAreas',params,
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
    this.setData({ show_area: true });
  },
  onConfirm_area(e) {
    var that = this;
    var area_name = e.detail.value.text;
    var area_id = e.detail.value.id;
    var tag_3 = e.detail.index;
    that.setData({
      area_name:area_name,
      area_id:area_id,
      tag_3:tag_3,
    })
    that.setData({ show_area: false });
  },
  onClose() {
    this.setData({ show: false,show_city: false,show_area: false });
  },
  onCancel() {
    this.setData({ show: false,show_city: false,show_area: false });
  },
  //协议
  tapMessage(){
    var that = this;
    http.postRequest('public/plugin/store/api_index/getAgreement',{},
    function(res){
      if(res.code == 200){
        that.setData({
          agree_show:true,
          agree_content:res.data
        })
      }
    },
    function(err){

    })
  },
  agree_onClose(){
    var that = this;
    that.setData({
      agree_show:false
    })
  },
  onChangeName(event){
    this.setData({
      name:event.detail
    })
  },
  onChangeLicenseCode(event){
    this.setData({
      license_code:event.detail
    })
  },
  onChangeIdName(event){
    this.setData({
      id_name:event.detail
    })
  },
  onChangeIdCard(event){
    this.setData({
      id_card:event.detail
    })
  },
  onChangeLocation(event){
    this.setData({
      location:event.detail
    })
  },
  onChangeContent(event){
    this.setData({
      content:event.detail
    })
  },
  //申请入驻
  applySettle(){
    var that = this;
    var id = wx.getStorageSync('uid');
    var name = that.data.name;
    var license_code = that.data.license_code;
    var id_name = that.data.id_name;
    var id_card = that.data.id_card;
    var location = that.data.location;
    var content = that.data.content;
    var province = that.data.provice_id;
    var city = that.data.city_id;
    var area = that.data.area_id;
    var tag_1 = that.data.tag_1;
    var tag_2 = that.data.tag_2;
    var tag_3 = that.data.tag_3;
    var name_1 = that.data.provice_name;
    var name_2 = that.data.city_name;
    var name_3 = that.data.area_name;
    var thumb = '';
    var license = '';
    var id_card_image = [];
    if(that.data.fileList.length>0){
      thumb = that.data.fileList[0].url
    }
    if(that.data.licensefileList.length>0){
      license = that.data.licensefileList[0].url
    }
    if(that.data.idfileList.length>0){
      for (const item in that.data.idfileList) {
        if(item){
          id_card_image.push(that.data.idfileList[item].url)
        }
      }
    }
    if(!that.data.checked){
      Notify({ type: 'warning', message: '请先勾选入驻协议!' });
      return;
    }
   
    if(id==undefined||id==''||name==''||license_code==''||id_name==''||id_card==''||location==''||content==''||province==''||city==''||area==''||thumb==''||license==''||id_card_image.length<2 ){
      Notify({ type: 'warning', message: '请将信息填写完整!' });
      return;
    }

    var add_url = 'public/plugin/store/api_index/addStore';
    if(that.data.store_status >0){
      add_url = 'public/plugin/store/api_index/reAddStore';
    }
    
    var params = {
      id:id,
      name:name,
      license_code:license_code,
      id_name:id_name,
      id_code:id_card,
      location:location,
      content:content,
      province:province,
      city:city,
      area:area,
      thumb:thumb,
      license:license,
      id_image:id_card_image,
      tag_1:tag_1,
      tag_2:tag_2,
      tag_3:tag_3,
      name_1:name_1,
      name_2:name_2,
      name_3:name_3,
    };
    http.postRequest(add_url,params,
    function(res){
      console.log(res);
      if(res.code == 200){
        Notify({ type: 'success', message: res.message });
        wx.redirectTo({
          url: '/pages/progress/progress',
        })
      }else{
        Notify({ type: 'danger', message: res.message });
      }
    },function(err){

    })
  }
})