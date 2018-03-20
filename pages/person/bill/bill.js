// pages/person/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    billList: [{
      spu: '家庭灯具管道维修',
      sku: '手动拆卸疏通',
      code: '454354343433221',
      price: 300
    },
    {
      spu: '家庭灯具管道维修',
      sku: '手动拆卸疏通',
      code: '454354343433221',
      price: 300
    }],
    flagArr:[],
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  isChoose: function (e) {
    var index = e.currentTarget.dataset.index;
    var arr = this.data.flagArr;
    arr[index] = !arr[index];
    this.setData({
      flagArr: arr
    });
    console.log(this.data.flagArr)
  },
  goApply: function () {
    var arr = this.data.flagArr;
    var len = arr.length;
    var isGo = false;
    for (let i = 0; i < len; i++) {
      isGo = isGo || arr[i];
      if(isGo){
        break;
      }
    };
    if (isGo){
      wx.navigateTo({
        url: '../billApply/billApply',
      })
    }
    else{
        wx.showToast({
          title: '请选择要申请的发票',
          icon: 'none',
        })
    }
    
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
      var len = this.data.billList.length;
      var flagList = [];
      for(let i = 0;i<len;i++){
        flagList.push(false)
      };
      this.setData({
        flagArr: flagList
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