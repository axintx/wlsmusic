// index.js
import request from '../../utils/request'

Page({
  data: {
    bannerList: [], // 轮播图数据
    recommendList: [] // 推荐歌单
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数 -- 监听页面加载
   */
  onLoad: async function(options) {
    let page = this
    // 获取轮播图数据
    let bannerListData = await request('/banner', {type:2});
    this.setData({
      bannerList: bannerListData.banners
    })

    // 获取推荐数据
    // let recommendListData = await request('/personalized', {limit:20});
    let recommendListData = await request('/personalized/newsong', {limit:10});
    this.setData({
      recommendList: recommendListData.result
    })
  }
})
