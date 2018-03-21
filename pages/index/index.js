//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      '/img/banner.png'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    region: ['广东省', '广州市', '海珠区']

  },

  onLoad: function () {
  },
  bindRegionChange:function(e){
    this.setData({
      region: e.detail.value
    })
  },
  goSearch:function(){
    wx.navigateTo({
      url: './search/search'
    })
  }


})