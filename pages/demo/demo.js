//index.js
//获取应用实例

let timer; //定义一个全局的定时器
let numAi = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnState: false,
    winNum: 0, //胜利次数初始化为0
    imageAiSrc: '', //电脑左侧图资源
    imageUserSrc: '../../images/wenhao.jpg', //初始化 + 用户选择图片资源
    gameResult: '',
    srcs: [
      '../../images/shitou.jpg',
      '../../images/jiandao.jpg',
      '../../images/bu.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面一打开就进行初始化的方法
   */
  onLoad: function(options) {
    let oldWinNum = wx.getStorageSync('winNum'); //从微信缓存中取出历史数据
    if (oldWinNum != null && oldWinNum != '') {

      this.setData({
        winNum: oldWinNum
      })
      //this.setData({})用于将数据从逻辑层发送到视图层(异步),同时改变this.data的值(同步)
      //this.data只能更改逻辑层的值，而视图层不会重置。即页面内容不会更新。
      //另外,如果页面需要显示动态数据,则必须要把数据更新到data中对应的变量中。

    }
    this.timerGo();
  },

  /**
   * 在该页面注册函数
   */
  timerGo: function() {
    //let point = this;//因为在下一个内部函数,this指向会丢失,所以这里保存一下this指向
    timer = setInterval(this.move, 100)
  },

  //或:timerGo(){}  ES6写法

  move: function() {
    //随机数向下取整
    numAi = parseInt(Math.floor(Math.random() * 3));

    //this.setData({})框架自带方法，给页面数据源设置数据
    this.setData({
      imageAiSrc: this.data.srcs[numAi]
    })
  },


  /**
   * 为用户图片点击进行监听处理事件
   */
  changeForChoose(event) {
    if (this.data.btnState) {
      return;
    }
    console.log(event);
    this.setData({
      imageUserSrc: this.data.srcs[event.currentTarget.id]
    })
    clearInterval(timer); //用户选择完成，停止定时器

    let user = this.data.imageUserSrc;
    let ai = this.data.imageAiSrc;
    let num = this.data.winNum;
    let str = '啊欧,您输了~';

    if (user == '../../images/shitou.jpg' && ai == '../../images/jiandao.jpg') {
      num++;
      str = '恭喜您,您赢了！！！';
      //同步缓存的方式,把赢的次数存进微信的缓存里
      wx.setStorageSync('winNum', num);
    }

    if (user == '../../images/jiandao.jpg' && ai == '../../images/bu.jpg') {
      num++;
      str = '恭喜您,您赢了！！！';
      //同步缓存的方式,把赢的次数存进微信的缓存里
      wx.setStorageSync('winNum', num)
    }

    if (user == '../../images/bu.jpg' && ai == '../../images/shitou.jpg') {
      num++;
      str = '恭喜您,您赢了！！！';
      //同步缓存的方式,把赢的次数存进微信的缓存里
      //同步缓存：用户必须执行完这段代码，才能继续执行接下来的代码
      //异步缓存：用户可以随时触发这段代码，其他代码是否执行与之无关
      wx.setStorageSync('winNum', num)
    }

    if (user == ai) {
      str = '平局,再来一次吧！';
    }

    this.setData({
      winNum: num,
      gameResult: str,
      btnState: true //游戏结束
    })
  },

  /**
   * 再玩一次
   */
  doAgain() {
    if (this.data.btnState == false) {
      return; //定时器已经开启了,不能重复点击
    }
    this.timerGo();
    this.setData({
      btnState: false,
      gameResult: '', //清空结果
      imageUserSrc: '../../images/wenhao.jpg'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'title', //分享标题
      desc: 'desc', //分享描述
      path: 'path' //分享路径
    }
  }
})