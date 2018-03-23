// pages/person/orderList/orderList.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    _index: 1,
    data: [], // 订单列表
    pageSize: 10,
    currentPage: 1,
    totalRecord: null,
    totalPage: null,
  },
  selected (e) { // 选择订单类型
    this.setData({
      _index : e.currentTarget.dataset.index
    })
    this.getOrderList()
  },
  orderDetail (e) {
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/order/orderState/orderState?orderid=${orderid}`,
    })
  },
  getOrderList () {
    // 获取订单列表
    app.request({
      url: app.$api.order.my_orders,
      data: {
        status: this.data._index,
        pageSize: 10,
        currentPage: 1
      },
      success: res => {
        if (res.data.result == 1) {
          res.data.data = res.data.data.map(item => {
            item.downTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.downTime))
            item.appointedTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.appointedTime))
            return item
          })
          this.setData({
            ...res.data
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取订单列表
    this.getOrderList()
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