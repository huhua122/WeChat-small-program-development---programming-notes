//app.js是项目的入口文件
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)},

/*
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }*/


  checkUserInfo:function(cb){
    let that = this;//这里要保存下this指向
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo,true);
    }else{
      wx.getSetting({
        success:function(res){
          if(res.authSetting['scope.userInfo']){
             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
             wx.getUserInfo({
               success:function(res){
                 that.globalData.userInfo = JSON.parse(res.rawData);
                 typeof cb == "function" && cb(that.globalData.userInfo,true);
               }
             })
          }else{
            typeof cb == "function" && cb(that.globalData.userInfo,false);
          }
        }
      })
    }
  },

  //全局变量
  globalData: {
    openid:"",
    userInfo: null,
    defaultImageUrl:'',
    imageUrl:''
  }
})