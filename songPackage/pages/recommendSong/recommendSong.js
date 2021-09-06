import request from "../../../utils/request"

// songPackage/pages/recommendSong/recommendSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', // 天
    month: '', // 月
    recommendList: [], // 推荐列表数据,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转到登录页面 
          // 关闭所有页面，打开到应用内的某个页面
          wx.reLaunch({
            url:'/pages/login/login'
          })
        }
      })
    }

    // 更新日期状态
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
      
    })

    // 获取每日推荐数据
    this.getRecommendList();
  },

  // 获取用户推荐数据
  ///recommend/songs  说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 

  async getRecommendList() {
    let recommendListData = await request('/recommend/songs', { limit: 33 });
    console.log(recommendListData);
    this.setData({
      recommendList: recommendListData.recommend,
      totalNum: recommendListData.recommend.length
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