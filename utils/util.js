// 发送 ajax 请求
/**
 * 
 */

 import config from './config'

export default (url,data={}, method='GET') => {
  wx.request({
    url: config.host + url, 
    data,
    method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      page.setData({
        bannerList: res.data.banners,
      })
    }
  })
}
