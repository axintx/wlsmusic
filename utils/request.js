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
        // 'content-type': 'application/json', // 默认值
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
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
        if(res.data.code == 301) {
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
        resolve(res.data)
      },
      fail: (err) => {
        
        reject(err);
      }
    })
  })
}
