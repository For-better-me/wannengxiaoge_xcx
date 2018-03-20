// pages/status/status/register.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readFlag: true,
    isOpen: false,
    passwordType: 'password',
    captcha: '获取验证码',
    isGetCaptcha: true,
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  toggleRead: function () {
    let isRead = !this.data.readFlag;
    this.setData({
      readFlag: isRead
    })
  },
  toggleType: function () {
    let isOpen = !this.data.isOpen;
    let type = '';
    if (isOpen) {
      type = 'text'
    }
    else {
      type = 'password'
    }
    this.setData({
      isOpen: isOpen,
      passwordType: type
    })
  },
  //倒计时
  countDown: function (num) {
    let count = num || 4;
    var that = this;
    that.setData({
      captcha: '重新发送(' + count + ')',
      isGetCaptcha: false
    });
    var timer = setInterval(function () {
      count--;
      that.setData({
        captcha: '重新发送(' + count + ')'
      });
      if (count < 1) {
        clearInterval(timer);
        that.setData({
          captcha: '获取验证码',
          isGetCaptcha: true
        });
      }
    }, 1000);
  },
  //获取验证码
  getCaptcha: function (e) {
    let numberTel = this.data.phone;
    if (!numberTel) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    let isNumber = util.isPhone(numberTel);
    if (!isNumber) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return;
    }
    if (this.data.isGetCaptcha) {
      this.countDown(10);
    }

  },
  bindKeyInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      phone: e.detail.value
    })
  },
  goLogin:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  }
})