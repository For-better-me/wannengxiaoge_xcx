// pages/index/order/order.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [],
    btnFlag:true,
    multiIndex:[0,0],
    multiArray: [],
    comingTime:''
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
    var timeArr = util.getComingTime();
    this.setData({
      multiArray: timeArr
    })
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

  addPic:function(){
    let that = this;
    wx.chooseImage({
      count:1,
      sizeType:'compressed',
      success: function(res) {
        let listImg = that.data.imageArray;
        res.tempFilePaths.forEach(function(img){
            listImg.push(img);
        });
        if(listImg.length == 3){
          that.setData({
            btnFlag: false
          });
        }
        that.setData({
          imageArray: listImg
        });
        
        
      },
    })
    
  },
  preview:function(e){
    let currentImg = e.currentTarget.dataset.src;
    wx.previewImage({
      current: currentImg,
      urls: this.data.imageArray,
    })
  },
  deleteImg:function(e){
    let currentIndex = e.currentTarget.dataset.index;
    let listImg = this.data.imageArray;
    listImg.splice(currentIndex,1);
    this.setData({
      imageArray: listImg,
      btnFlag:true
    });
  },
  timeColumnChange:function(e){
    var _column = e.detail.column;
    var _value = e.detail.value;
    if(_column==0){
      var coming_time = util.getComingTime();
      if (_value == 0){
        this.setData({
          multiArray: coming_time
        })
      }
      else{
        coming_time[1] = util.hourAll;
        this.setData({
          multiArray: coming_time
        })
      }
    }
  },
  timePickerChange:function(e){
    var multiTime = this.data.multiArray;
    var val = e.detail.value;
    console.log(multiTime)
    this.setData({
      comingTime: multiTime[0][val[0]] +' '+ multiTime[1][val[1]]
    })
  }
})