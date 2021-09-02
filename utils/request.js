// 发送 ajax 请求
/**
 * 
 */

import config from './config'

export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        'content-type': 'application/json', // 默认值
        // cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cokkies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        // console.log('1',res)
        // console.log('cookies',res.cookies)
        if (data.isLogin) {
          wx.setStorage({
            data: res.cookies,
            key: 'cookies',
          })
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
