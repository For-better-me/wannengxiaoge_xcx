// pages/status/status/register.js
const app = getApp()

const md5 = require('../../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    readFlag: true,
    isOpen: false,
    captcha: '获取验证码',
    isGetCaptcha: true,
    redirect: '', // 登录成功后的重定向页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.redirect) {
      this.setData({
        redirect: options.redirect
      })
    }
    console.log(getCurrentPages())
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

  setPhoneValue (e) { // 设置手机号
    this.setData({
      phone: e.detail.value
    })
  },
  setCodeValue (e) { // 设置验证码值
    this.setData({
      code: e.detail.value
    })
  },
  getCaptcha () {
    // 获取验证码
    if (this.data.phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
      return
    }

    if (this.data.isGetCaptcha) {
      this.setData({
        isGetCaptcha: true
      })
      app.request({
        url: app.$api.status.sms,
        data: {phone: this.data.phone, type: '1'},
        method: 'POST',
        success: res => {
          if (res.result == 1) {
            let time = 60;
            let interval = setInterval(() => {
              if (--time > 0) {
                this.setData({
                  captcha: `重新发送(${time})`
                })
              } else {
                clearInterval(interval)
                this.setData({
                  isGetCaptcha: false,
                  captcha: `获取验证码`
                })
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.desc,
              icon:'none'
            })
            this.setData({
              isGetCaptcha: false
            })
          }
        }
      })
    }    
  },
  login () {
    // 登录
    app.request({
      url: app.$api.public.login,
      method: 'POST',
      //data: {tel: this.data.phone, code: this.data.code},
      data: {tel: '13739756831', password: md5('123456').toLocaleUpperCase()},
      success: res => {
        if (res.data.result == 1) {
          // 存储token
          wx.setStorageSync("token", res.data.data.token)
          if (this.data.redirect) {
            wx.navigateBack()
          }
        } else {
          wx.showToast({
            title: res.data.desc,
            icon:'none'
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})