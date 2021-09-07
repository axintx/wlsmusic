
import moment from 'moment'

import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId: '', // 音乐id
    song: {}, //歌曲详情对象
    durationTime: '00:00' // 总时长 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options ： 用于接收路由跳转的query参数
    // 原生小程序中路由传参，对参数的长度有限制，如果参数长度过长会自动截取
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    // 获取音乐详情
    this.getMusicInfo(musicId)

  },

  // 获取音乐详情函数
  async getMusicInfo(musicId) {
    let songData = await request('/song/detail', { ids: musicId });
    let durationTime = moment(songData.songs[0].dt).format('mm:ss');
    this.setData({
      song: songData.songs[0],
      durationTime
    })

    // 动态改变窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name,
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