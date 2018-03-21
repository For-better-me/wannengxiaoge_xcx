//app.js
const util = require('./utils/util.js')
const md5 = require('./utils/md5.js')
const api = require('./utils/api.js')
const ENV = 'dev' // 开发环境配置 dev开发环境  pro生产环境

App({
  deBug: true, // 是否调试模式
  _log (msg, type='log') {
    if (this.deBug) {
      console[type](msg)
    }
  },
  requestStack: [], // 请求栈，防止同时执行多条查询
  onLaunch: function () {
    this.request({
      url: this.$api.index.all_citys,
      success: res => {
        console.log(res)
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        } 
      }
    })
  },
  login(callback) {
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.$api.login,
          data: {
            code: res.code
          },
          success: res => {
            this._log('后台登录成功')
            // 缓存session
            wx.setStorageSync('sessionid', res.data.sessionId)
            // 缓存头像和昵称
            this.cacheUserInfo(res.data)

            // 需要拉取用户信息给后台
            if (res.data.infoFlag == 1) {
                this.getUserInfo(res2 => {
                  this.request({
                    url: this.$api.post_userinfo,
                    data: {
                      iv: res2.iv,
                      encryptedData: res2.encryptedData,
                      sessionId: res.data.sessionId
                    },
                    success: () => {
                      this.runCallback(callback)
                    }
                  })
                })
            } else {
              this.runCallback(callback)
            }
          }
        })
      }
    })
  },
  checkLogin(callback) {
    // 检测登录状态
    this._log('检测登录状态')
    wx.checkSession({
      success: () => {
        // 登录未过期
        this._log('登录未过期')
        if (!wx.getStorageSync('sessionid')) {
          this._log('登录未过期，但是丢失sessionid')
          this.login(callback)
        } else {
          this.runCallback(callback)
        }
      },
      fail: () => {
        // 登录已过期
        this._log('登录已过期')
        this.login(callback)
      }
    })
  },
  request(requestOpt) {
    // 封装request请求
    // 逐个调用请求栈，防止同时执行多条查询
    this.requestStack.push(requestOpt)
    this.runRequestStack(this.requestStack[0])
  },
  runRequestStack(opt) {
    //this.checkLogin(() => {
      // 封装公共入参 和 接口入参
      let _queryString = {
        encodingType: '1', // 返回值编码 1 UTF8
        origin: '1', // 来源 1 用户 | 2 Android小哥 | 3 IOS小哥 | 4 商户 | 5 经销商 | 6 Ios用户 | 7 Android用户
        signType: '1', // 签名方式 1 md5
        signKey: 'user000011111111', // 加密的key
        ...opt.data,
      }
      let queryString = ''
      for (let key in _queryString) {
        queryString += (queryString != '' ? '&' : '') + `${key}=${_queryString[key]}`
      }
      let queryStirngMd5 = md5(queryString).toUpperCase()
      opt.data = queryString.replace(/signKey=(.*)$/, `signData=${queryStirngMd5}`)
      opt.data = util.queryStringToObject(opt.data)


      //防止按钮多次提交
      if (opt.button && this.globalData.isRequest) {
        this._log('阻止重复提交请求')
        return
      }

      this.globalData.isRequest = true
      ////const sessionid = wx.getStorageSync('sessionid')
      ////opt.data.sessionId = sessionid

      const defaultOpt = {
        loading: true, // 是否显示Loading提示窗
        method: 'GET', // 请求方法，必须大写！！
      }

      opt = util.merge(defaultOpt, opt)

      if (opt.loading) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
      }

      wx.request({
        url: opt.url,
        method: opt.method,
        data: opt.data,
        success: res => {
          // 删除本次回调栈
          this.requestStack.splice(0, 1)
          if (this.requestStack.length != 0) {
            // 如果回调栈还有回调，继续执行
            this.runRequestStack(this.requestStack[0])
          }
          if (res.data.err == 101) {
            // 后台未登录或登录超时
            this._log('后台未登录或登录超时')
            this.login(() => {
              this.request(opt)
            })
          } else if (res.data.err == 1) {
            wx.showModal({
              title: '提示',
              content: res.data.msg || '网络错误',
              showCancel: false,
              success: () => {
                this.runCallback(opt.fail, res)
              }
            })
          } else {
            this.runCallback(opt.success, res)
          }
        },
        fail: (res) => {
          // 删除本次回调栈
          this.requestStack.splice(0, 1)
          if (this.requestStack.length != 0) {
            // 如果回调栈还有回调，继续执行
            this.runRequestStack(this.requestStack[0])
          }
        },
        complete: res => {
          setTimeout(() => {
            this.globalData.isRequest = false
            if (opt.loading) {
              wx.hideLoading()
            }
          }, 300)
        }
      })
    //})
  },
  runCallback(callback, opt = '') {
    // 封装执行回调，参数必须为函数
    if (typeof callback === 'function') {
      callback(opt)
    } else {
      console.error('回调函数必须为函数')
    }
  },
  getUserInfo(success, fail) {
    //获取用户信息
    let self = this

    function openSetting(success) {
      wx.openSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            self.getUserInfo(success)
          } else {
            openSetting(success)
          }
        },
        fail: res => {
          openSetting(success)
        }
      })
    }

    wx.getUserInfo({
      success: res => {
        this.cacheUserInfo(res.userInfo)
        success(res)
      },
      fail: res => {
        //拒绝获取用户信息
        openSetting(success)
      }
    })
  },
  cacheUserInfo(userInfo) {
    // 缓存用户信息 头像、昵称、省、市
    wx.setStorageSync("avatarUrl", userInfo.avatarUrl)
    wx.setStorageSync('nickName', userInfo.nickName)
    wx.setStorageSync('province', userInfo.province)
    wx.setStorageSync('city', userInfo.city)
  },
  $md5: md5, // 注册md5加密
  $api: ENV == "dev" ? api.dev : api.pro, //接口定义
  globalData: {
    userInfo: null
  }
})