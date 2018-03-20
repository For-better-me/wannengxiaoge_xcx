// pages/person/editAddr/editAddr.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr:''
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
  chooseArea:function(){
    var self = this;
    wx.chooseLocation({
      success: function(res) {
        self.setData({
          addr:res.address
        })
      },
    })
  },
  editAddr:function(e){
    var formVal = e.detail.value;
    var telNumber = formVal.tel;
    if (telNumber){
      if (!util.isPhone(telNumber)){
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
    }
    if (formVal.name == '' || formVal.tel == '' || formVal.area == '' || formVal.addr == ''){
      wx.showToast({
        title: '请完善地址信息',
        icon:'none'
      });
    }
    else{
      wx.redirectTo({
        url: '../myaddr/myaddr',
      })
    }
  }
})