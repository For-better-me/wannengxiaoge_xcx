// pages/person/orderState/orderState.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    toggle: false,
    toggleimg: "/img/icon_arrow2.png",
    data: {}, // 订单详情
  },
  // toggle
  toggle2:function(){
    var value2 = !this.data.toggle
    this.setData({
      toggle:value2,
      toggleimg:"/img/icon_arrow2.png"
    })
    if(value2){
      this.setData({
        toggleimg:"/img/icon_arrow2_up.png"
      })
    }
  },
  /**
   * 联系小哥
   */
  callXG:function(){
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取订单详情
    app.request({
      url: app.$api.order.my_order_details,
      data: {
        orderId: options.orderid
      },
      success: res => {
        if (res.data.result == 1) {
          res.data.data.appointedTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(res.data.data.appointedTime))
          res.data.data.downTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(res.data.data.downTime))
          res.data.data.orderOperateRecord.creatTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(res.data.data.orderOperateRecord.creatTime))
          this.setData({
            data: res.data.data
          })
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