var http = require('../../utils/httputils');//网络请求
const app = getApp();
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bank_list:''
  },
  onShow: function () {
    this.fetchBankList();
  },
  fetchBankList(){
    var that = this;
    var params = {
      uid:wx.getStorageSync('uid')
    };
    http.postRequest('public/plugin/fund/api_index/index',params,function(res){
      console.log(res)
      if(res.code == 200){
        that.setData({
          bank_list:res.data.content
        })
      }
    },function(err){})
  },
  //设为默认
  setDefault(e){
    var that = this;
    var params = {
      uid:wx.getStorageSync('uid'),
      id:e.currentTarget.dataset.id,
    };
    http.postRequest('public/plugin/fund/api_index/defaultaccount',params,function(res){
      if(res.code == 200){
        app.globalData.totify({ type: 'primary', message: res.message });
        that.fetchBankList();
      }else{
        app.globalData.totify({ type: 'warning', message: res.message });
      }
    },function(err){})
  },
  //删除银行卡
  delete_card(e){
    var that = this;
    var params = {
      id:e.currentTarget.dataset.id,
    };
    Dialog.confirm({
      title: '提示',
      message: '是否确认删除?'
    }).then(() => {
      http.postRequest('public/plugin/fund/api_index/delaccount',params,function(res){
      if(res.code == 200){
        app.globalData.totify({ type: 'primary', message: res.message });
        that.fetchBankList();
      }else{
        app.globalData.totify({ type: 'warning', message: res.message });
      }
    },function(err){})
    }).catch(() => {
      // on cancel
    });
  }
})