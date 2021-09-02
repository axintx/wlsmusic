// pages/login/login.js

/**
 * 说明：登录流程
 * 1. 收集表单项数据
 * 2. 前端验证
 *    1）验证用户信息（账号 密码）是否合法
 *    2）前端验证不通过提示用户，不发请求
 *    3）前端验证通过，发请求（带账号，密码）给服务器端
 * 3. 后端验证
 *    1) 验证用户是否存在
 *    2）用户不存在直接返回，告诉前端用户不存在
 *    3) 用户存在需要验证密码是否正确
 *    4）密码不正确提示返回 前端提示密码错误
 *    5）密码正确返回数据给前端 提示登录成功 带用户相关数据
 */
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单项内容改变的回调
  handleInput(event) {
    console.log(event);
    let type = event.currentTarget.dataset.type
    console.log(type);
    this.setData({
      [type]: event.detail.value
    })
  },

  // 登录 回调
  async login() {
    // 1. 收集表单中的数据
    let { phone, password } = this.data;

    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    // 手机号正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    // 后端验证
    let result = await request('/login/cellphone', { phone, password, isLogin: true })
    console.log('result',result)
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    }
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