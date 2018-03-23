// pages/person/orderTrack/orderTrack.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 'WNQYD3438524',
    state: '订单已取消，退款中',
    skuname: '马桶疏通：非拆卸，手动疏通',
    toDorTime: '2017.06.10  15:30',
    url: '/img/tail.png',
    url2: '/img/icon_select.png',
    data: {}, // 订单详情
    lists: [], // 订单状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取订单详情
    app.request({
      url: app.$api.order.my_order_details,
      loading: false,
      data: {
        orderId: options.orderid
      },
      success: res => {
        if (res.data.result == 1) {
          res.data.data.appointedTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(res.data.data.appointedTime))
          res.data.data.downTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(res.data.data.downTime))
          res.data.data.orderOperateRecord.creatTime = util.dateFtt('yyyy-MM-dd hh:mm', new Date(res.data.data.orderOperateRecord.creatTime))
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
    }, false)

    // 获取订单状态记录
    app.request({
      url: app.$api.order.my_order_operate_record,
      data: {
        orderId: options.orderid
      },
      success: res => {
        if (res.data.result == 1) {
          this.setData({
            lists: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.desc,
            icon:'none'
          })
        }
      }
    }, false)
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