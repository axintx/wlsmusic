// pages/personal.js
import request from '../../utils/request'
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    recentPlayList: [], // 用户播放记录

    coveTransition: '',
    coverTransform: 'translateY(0)'
  },


  
  // onPageScroll:function(e){
  //   if(e.scrollTop<0){
  //     wx.pageScrollTo({
  //       scrollTop: 0
  //     })
  //   }
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户信息
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })

      // 获取用户播放记录的函数
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },

  // 获取用户播放记录
  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record', { uid: userId, type: 0 });
    let index = 0;
    let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
      item.id = index++;
      return item;
    })
    console.log(recentPlayList);
    this.setData({
      recentPlayList
    })
  },

  handleTouchStart(event) {
    console.log('event', event);
    this.setData({
      coveTransition: ''
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;

    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80;
    }
    // 动态更新 coverTransForm的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },

  handleTouchEnd() {
    // 动态更新 coverTransform 的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
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