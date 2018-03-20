// pages/person/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "goodPicUrl1": "/img/icon_good.png",
    "goodPicUrl2": "/img/icon_good2.png",
    "sosoPicUrl1": "/img/icon_soso.png",
    "sosoPicUrl2": "/img/icon_soso2.png",
    "poorPicUrl1": "/img/icon_poor.png",
    "poorPicUrl2": "/img/icon_poor2.png",
    _index:0,
    "starNormal": "/img/icon_star2.png",
    "starSlecte": "/img/icon_star3.png",
    flag:5,
    starArr:[-1,-1,-1,-1],
    commentArr : ['差','不好','好', '很好',' 非常好'],
    "anonymous1":"/img/icon_faceless.png",
    "anonymous2": "/img/icon_faceless2.png",
    isAnonymous:false,
    textarea:''
  },
  // 总体评价
  select: function (e) {
    this.setData({
      _index: e.currentTarget.dataset.index
    })
  },
  // 服务评价
  changeColor: function (e) {
    var index = e.currentTarget.dataset.index;
    var parent_index = e.currentTarget.dataset.parentindex;
    var _starArr = this.data.starArr;
    _starArr[parent_index] = index;
    var that = this;
    that.setData({
      starArr:_starArr
    });
    console.log(this.data.starArr)
  },
  // 是否匿名
  isAnonymous:function(e){
    var isA = !this.data.isAnonymous; 
    this.setData({
      isAnonymous:isA
    })
  },
  evalForm:function(e){
    console.log(e)
    var z_index = this.data._index
    if (z_index == 0){
      wx.showToast({
        title: '请进行总体评价',
        icon: 'none'
      })
      return
    }
    var submitVal = e.detail.value;
    console.log(submitVal)
    if (submitVal.textarea.length == 0){
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
      return
    }
    var starNum = this.data.starArr;
    console.log(starNum)
    for (var i = 0; i < starNum.length; i++){
      if (starNum[0] == -1){
        wx.showToast({
          title: '请对接单速度进行星级评价',
          icon:'none'
        })
        return
      }
      if (starNum[1] == -1) {
        wx.showToast({
          title: '请对仪表仪容进行星级评价',
          icon: 'none'
        })
        return
      }
      if (starNum[2] == -1) {
        wx.showToast({
          title: '请对服务态度进行星级评价',
          icon: 'none'
        })
        return
      }
      if (starNum[3] == -1) {
        wx.showToast({
          title: '请对专业程度进行星级评价',
          icon: 'none'
        })
        return
      }
    }
    wx.navigateTo({
      url: '../../ceshi/ceshi',
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
  
  }
})