// pages/index/detail/detail.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    animationData2: {},
    shadeFlag:false,
    numTitle:'0',
    serveName:'',
    serveNum:1,
    _serveIndex:0
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
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    });
    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    var animation3 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    });
    var animation4 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    this.animation = animation;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseItem:function(){
    this.animation.bottom('0rpx').step();
    this.animation2.opacity('1').step();
    this.setData({
      shadeFlag: true,
      animationData2: this.animation2.export(),
      animationData: this.animation.export()
      
      
    })
  },
  closeLayer:function(){
    this.animation3.bottom('-1500rpx').step();
    this.animation4.opacity('0').step();
    this.setData({
      animationData2: this.animation4.export(),
      animationData: this.animation3.export(),
      shadeFlag: false,


    })
  },
  goFix:function(){
    if (this.data.serveName){
      wx.navigateTo({
        url: '../order/order'
      });
    }
    else{
      wx.showToast({
        title: '请选择服务项',
        icon:'none'
      })
    }
    
  },
  chooseServe:function(e){
    var data = e.currentTarget.dataset;
    var _index = data.index;
    this.setData({
      _serveIndex : _index,
      serveName:data.name
    })
  },
  countNum:function(e){
    let _type = e.currentTarget.dataset.type;
    let _num = e.currentTarget.dataset.num;
    var _setveNum = util.count(_type,_num);
    console.log(_num, _setveNum);
    this.setData({
      serveNum: _setveNum
    })
  },
  titleSwitch:function(e){
    let _index = e.currentTarget.dataset.num;
    this.setData({
      numTitle:_index
    })
  }
})