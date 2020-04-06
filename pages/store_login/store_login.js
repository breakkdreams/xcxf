var http = require('../../utils/httputils');//网络请求
const app = getApp();
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    mobile_code:'',
    password:'',
    re_password:'',
    time:'发送验证码',
    disabled: false,
    currentTime:61,
    status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //获取店铺状态
    this.getStoreInfo();
  },
  getStoreInfo(){
    var that = this;
    var params = {
      id:wx.getStorageSync('uid')
    }
    http.postRequest('public/plugin/store/api_index/getStore',params,function(res){
      if(res.code == 200){
        that.setData({
          status:res.data.status
        })
      }
    })
  },
  onChangeMobile(event){
    this.setData({
      mobile:event.detail
    })
  },
  onChangePassword(event){
    this.setData({
      password:event.detail
    })
  },
  onChangeRePassword(event){
    this.setData({
      re_password:event.detail
    })
  },
  onChangeMobileCode(event){
    this.setData({
      mobile_code:event.detail
    })
  },
  onChangeEmail(event){
    this.setData({
      email:event.detail
    })
  },
  //发送验证码
  sendMessage(){
    var that = this;
    if(!that.data.disabled){
      var params = {
        mobile:that.data.mobile,
      };
      http.postRequest('public/plugin/notice/api_index/smsCode',params,function(res){
        if(res.code == 200){
          Notify({ type: 'primary', message: '发送成功' });
          var currentTime = that.data.currentTime
          var interval = setInterval(function () {
            currentTime--;
            that.setData({
              time: currentTime+'秒',
              disabled: true
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新发送',
                currentTime:61,
                disabled: false   
              })
            }
          }, 1000)
        }else{
          Notify({ type: 'warning', message: res.message });
        }
      },function(err){

      })
    }
    
  },
  //注册
  register(){
    var that = this;
    var params = {
      mobile:that.data.mobile,
      mobile_code:that.data.mobile_code,
      email:that.data.email,
      password:that.data.password,
      re_password:that.data.re_password,
      uid:wx.getStorageSync('uid'),
    };
    http.postRequest('public/plugin/member/apiIndex/addStoreMember',params,function(res){
      if(res.code == 200){
        wx.setStorageSync('store_is', 1);
        Notify({ type: 'primary', message: res.message });
        //判断跳转页面
        if(that.data.status == 0){
          wx.redirectTo({
            url: '/pages/settled/settled',
          })
        }else if(that.data.status == 2){
          wx.redirectTo({
            url: '/pages/store_home/store_home',
          })
        }else{
          wx.redirectTo({
            url: '/pages/progress/progress',
          })
        }
      }else{
        Notify({ type: 'warning', message: res.message });
      }
    },function(err){

    })
  }
})