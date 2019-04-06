// pages/mine/mine.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    showPopup:false
  },

  //事件处理函数
  bindViewTap:function(){
    wx.navigateTo({
      url: '../logs/logs'
    })

  },

  showRecent:function(){
    wx.navigateTo({
      url: '../collected/collected?gotoType=recent'
    })
  },

  showCollected:function(){
    wx.navigateTo({
      url: '../collected/collected?gotoType=collected'
    })
  },

  showAboutMe:function(){
    wx.navigateTo({
      url: '../about/about_me'
    })
  },

  showAboutWechat:function(){
    wx.navigateTo({
      url: '../about/about_wechat'
    })
  },

  bindGetUserInfo:function(e){
    console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        showPopup:!this.data.showPopup,
        userInfo:e.detail.userInfo
      });
    }else{
      wx.switchTab({
        url: '../index/index',
      })
    }

  },

  /**
   * 自定义返回函数
   */
  navigateBack:function(e){
    wx.switchTab({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.checkUserInfo(function(userInfo,isLogin){
      if(!isLogin){
        that.setData({
          showPopup:true
        })
      }else{
        that.setData({
          userInfo:userInfo
        });
      }
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})