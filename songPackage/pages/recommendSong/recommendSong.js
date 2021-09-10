import PubSub from 'pubsub-js'
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
    totalNum: 0,
    index: 0 // 点击音乐的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    console.log('userInfo', userInfo);
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转到登录页面 
          // 关闭所有页面，打开到应用内的某个页面
          wx.reLaunch({
            url: '/pages/login/login'
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

    // 订阅来自 songDetail 页面发布的消息
    PubSub.subscribe('switchType', (msg, type) => {
      let { recommendList, index } = this.data;
      if (type === 'pre') {
        // 上一首 如果到第一首歌曲了， 下标切换到 最后一个首歌
        (index === 0) && (index = recommendList.length);
        index -= 1;
      } else {
        // 下一首 如果 到 最后一首歌了，下标切换到 第一首个歌
        (index === recommendList.length -1) && (index = -1);
        index += 1;
      }

      // 更新下标
      this.setData({
        index
      })

      let musicId = recommendList[index].id;
      // 将 musicId 回传给 songDetail 页面
      PubSub.publish('musicId', musicId)

    });
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

  // 跳转到 songDetail 页面
  toSongDetail(event) {
    console.log(event);
    let { song, index } = event.currentTarget.dataset;
    this.setData({
      index
    })
    // 路由跳转传参: query参数
    wx.navigateTo({
      // 不能直接将song对象作为参数传递，长度过长，会被截取掉
      url: '/songPackage/pages/songDetail/songDetail?musicId=' + song.id
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