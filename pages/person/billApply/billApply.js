// pages/person/billApply/billApply.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    addr:''
  },
  billForm: function (e) {
    console.log(e)
    var billhead = e.detail.value.billHead;
    var billnum = e.detail.value.billNum;
    var billtel = e.detail.value.billTel;
    var billname = e.detail.value.billName;
    var billaddr = e.detail.value.billAddr;
    var billaddrs = e.detail.value.billAddrs;
    if (billhead == '') {
      wx.showToast({
        title: '请填写发票抬头',
        icon: 'none'
      })
      return
    }
    if (billnum == '') {
      wx.showToast({
        title: '请填写纳税人识别号',
        icon: 'none'
      })
      return
    }
    if (billname == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (billtel == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    if (billaddr == '') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return
    }
    if (billaddrs == '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../../person/bill/bill',
    })
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
  lookmap: function () {
    var self = this;
    wx.chooseLocation({
      success: function (res) {
        self.setData({
          addr: res.address
        })
      }
    })
  }
})