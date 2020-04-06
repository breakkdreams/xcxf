// pages/store_coupon/store_coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    card_show: false,
    card_package_show: false,
    time_show: false,
    package_time_show: false,
    card_list_show: false,
    timer:'',
    package_timer:'',
    card_choose:'',
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    
  },
  //打开添加优惠劵
  add_card(){
    this.setData({ card_show: true });
  },
  add_package_card(){
    this.setData({ card_package_show: true });
  },
  confirm_card(event) {
    this.setData({ card_show: false,time_show:false });
  },
  confirm_package_card(event) {
    this.setData({ card_package_show: false,package_time_show:false,card_list_show: false });
  },

  onClose() {
    this.setData({ card_show: false,card_package_show: false,time_show:false,package_timer:false,card_list_show: false });
  },
  handleSelecteDate(e) {
    this.setData({ time_show: false, timer: e.detail.date });
  },
  handleSelectePackageDate(e) {
    this.setData({ package_time_show: false, package_timer: e.detail.date });
  },
  handleSelecteList(e) {
    console.log(e);
    this.setData({ card_list_show: false, card_choose: e.detail.value });
  },
  onChangeTime(){
    this.setData({ time_show: true });
  },
  onPackageChangeTime(){
    this.setData({ package_time_show: true });
  },
  onCardListChange(){
    this.setData({ card_list_show: true });
  },
  onListCancel(){
    this.setData({ card_list_show: false });
  }
})