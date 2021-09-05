// index.js
import request from '../../utils/request'

Page({
  data: {
    bannerList: [], // 轮播图数据
    recommendList: [], // 推荐歌单
    topList: [] // 排行榜歌单
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
  onLoad: async function (options) {
    let page = this
    // 获取轮播图数据
    let bannerListData = await request('/banner', { type: 2 });
    this.setData({
      bannerList: bannerListData.banners
    })

    // 获取推荐歌单
    // let recommendListData = await request('/personalized', {limit:20});
    let recommendListData = await request('/personalized/newsong', { limit: 10 });
    this.setData({
      recommendList: recommendListData.result
    })

    // 排行榜区域
    let index = 0
    let resultArr = [];
    while (index < 5) {
      let topListData = await request('/top/list', { idx: index++ })
      console.log(topListData);
      let topListItem = { name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3) };
      resultArr.push(topListItem);
      this.setData({
        topList: resultArr
      })
    }

  }
})
