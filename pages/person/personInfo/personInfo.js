// pages/person/personInfo/personInfo.js
var util = require('../../../utils/util.js');
const years = util.returnYear();
const months = util.returnMonth();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:'请选择性别',
    headimg:'/img/avatar2.png',
    ageArray: [years, months],
    ageIndex:[0,0]
  },
  bindAge: function(){
    var that = this;
    this.setData({
      hide:true
    })
  },
  cooseImg: function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: [],
      sourceType: [],
      success: function(res) {
          that.setData({
            headimg:res.tempFilePaths[0]
          })
      },
      fail: function(res) {
        console.log(123)
      },
      complete: function(res) {},
    })
  },
  choosesex:function(){
    var that = this;
    var list= ['女生', '男生']
    wx.showActionSheet({
      itemList: list,
      success: function (res) {
        that.setData({
          sex: list[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  agePickerChange:function(e){
    this.setData({
      ageIndex:e.detail.value
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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
  
  }
})