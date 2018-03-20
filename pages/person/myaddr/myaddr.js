// pages/person/myaddr/myaddr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrArr:[
      {
        name:'李三',
        tel:'177121212',
        addr:'石家庄市新华区中华北大街198号中储广场写字楼A座17层万能小哥技术部',
        check:true
      },
      {
        name: '李五',
        tel: '177121212',
        addr: '石家庄市新华区中华北大街198号中储广场',
        check: false
      }
    ],
    flagArr: []
  },
  isChoose:function(e){
    var index = e.currentTarget.dataset.index;
    var arr = this.data.addrArr;
    arr.forEach(function (item) {
      item.check = false;
    });
    arr[index].check = true;
    this.setData({
      addrArr: arr
    });
    console.log(this.data.addrArr)
  },
  deleteThis:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var arr = this.data.addrArr;
    if (arr[index].check){
      console.log('删除本条 '+ index +'，默认选中为删除后数组的第一个操作')
    }else{
      console.log('删除本条操作')
    }
  },
  editThis:function(e){
    var index = e.currentTarget.dataset.index;
    var arr = this.data.addrArr;
    wx.navigateTo({
      url:'../editAddr/editAddr?'+index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
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