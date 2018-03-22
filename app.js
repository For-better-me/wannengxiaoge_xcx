//app.js
const util = require('./utils/util.js')
const md5 = require('./utils/md5.js')
const api = require('./utils/api.js')
const api2 = require('./utils/api2.js')
const config = require('./utils/config.js')
const ENV = 'dev' // 开发环境配置 dev开发环境  pro生产环境

let requestQueue = [] // 请求队列，防止同时执行多条查询

App({
  deBug: true, // 是否调试模式
  _log (msg, type='log') {
    if (this.deBug) {
      console[type](msg)
    }
  },
  onLaunch: function () {
    // this.request({
    //   url: this.$api.index.ad_info,
    //   data: {typeCode: 'user_banner', cityCode: '130100'},
    //   success: res => {
    //     console.log(1,res)
    //   }
    // })

    // this.request({
    //   url: this.$api.index.all_citys,
    //   success: res => {
    //     console.log(2,res)
    //   }
    // })

    // this.getUserInfo(res => {
    //   console.log(res)
    // })

    // this.request({
    //   url: this.$api.person.problems,
    //   method: 'POST',
    //   data: {name: '*', isHot: 1, pageSize: 1},
    //   success: res => {
    //     console.log(3,res)
    //   }
    // })

    
    this.request({
      url: this.$api.person.serverTypeList,
      data: {cityCode: '130105', serviceId: 0},
      success: res => {
        console.log(4,res)
      }
    })

    // this.request({
    //   url: this.$api.demo.service_type_info,
    //   data: {serviceId: 9840},
    //   success: res => {
    //     console.log(4,res)
    //   }
    // })

    // this.request({
    //   url: this.$api.demo.skuDetail,
    //   data: {id: 123334},
    //   success: res => {
    //     console.log(4,res)
    //   }
    // })

    // 发送验证码 √
    // this.request({
    //   url: this.$api2.public.sms,
    //   method: 'POST',
    //   data: {phone: '15133124113', type: '1'},
    //   success: res => {
    //     console.log(4,res)
    //   }
    // })

    // 注册 √
    // this.request({
    //   url: this.$api2.public.register,
    //   method: 'POST',
    //   data: {name: 'renjie', sex: '2', tel: '15133124113', code: '1549', password: 'hehe123', openid: '1'},
    //   expressData: {avatarUrl: ''},
    //   success: res => {
    //     console.log(4,res)
    //   }
    // })

    // 登录 √
    // this.request({
    //   url: this.$api2.public.login,
    //   method: 'POST',
    //   data: {tel: '15133124113', password: 'hehe123'},
    //   success: res => {
    //     console.log(4,res)
    //   }
    // })

    this.request({
      url: this.$api2.address.user_default_address,
      success: res => {
        console.log('ffff',res)
      }
    })


    // wx.chooseAddress({
    //   success: res => {
    //     console.log('aaaaaaaaa',res)
    //   }
    // })

    // wx.getLocation({
    //   type: 'gcj02',
    //   success: res => {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     // wx.openLocation({
    //     //   latitude: latitude,
    //     //   longitude: longitude,
    //     //   scale: 5
    //     // })
    //   }
    // })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
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
  request(requestOpt, queue=true) {
    /**
     * 封装request请求
     * 默认逐个调用请求队列，防止同时执行多条查询
     * 如果传第二个参数为false则不加入队列，马上执行
     */
    if (queue) {
      requestOpt.queue = true
      requestQueue.push(requestOpt)
    } else {
      this.runRequestStack(requestOpt)
    }
    if (!requestQueue.isRequest && requestQueue.length > 0) {
      requestQueue.isRequest = true
      this.runRequestStack(requestQueue.shift())
    }
  },
  runRequestStack(opt) {
    //this.checkLogin(() => {
      // 封装公共入参 和 接口入参
      let _queryString = {
        encodingType: config.encodingType, // 返回值编码 1 UTF8
        origin: config.origin, // 来源 1 用户 | 2 Android小哥 | 3 IOS小哥 | 4 商户 | 5 经销商 | 6 Ios用户 | 7 Android用户
        signType: config.signType, // 签名方式 1 md5
        ...opt.data,
        signKey: config.signKey, // 加密的key
      }

      // 检测该接口是否需要token
      if (/token\|/.test(opt.url)) {
        _queryString.token = wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
        opt.url = opt.url.replace('token|', '')
      }

      let queryString = ''
      for (let key in _queryString) {
        queryString += (queryString != '' ? '&' : '') + `${key}=${_queryString[key]}`
      }
      let queryStirngMd5 = md5(queryString).toUpperCase()
      opt.data = queryString.replace(/signKey=(.*)$/, `signData=${queryStirngMd5}`)
      opt.data = util.queryStringToObject(opt.data)

      // 格式化接口地址
      let apiParams = opt.url.match(/{.*?}/g)
      if (apiParams) {
        apiParams.forEach(item => {
          opt.url = opt.url.replace(new RegExp(item), opt.data[item.replace(/[{}]/g, '')])
        })
      }

      //防止按钮多次提交
      if (opt.button && this.globalData.isRequest) {
        this._log('阻止重复提交请求')
        return
      }

      const defaultOpt = {
        loading: true, // 是否显示Loading提示窗
        method: 'GET', // 请求方法，必须大写！！
        data: {}, // 需要加密的数据
        expressData: {}, // 不需要加密的数据
        header: {
          token: wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
        }
      }

      // 合并配置项
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
        header: opt.header,
        success: res => {
          if (res.data.result == '9996') {
            // token验证失败
            this._log('未登录或token超时')
            setTimeout(() => {
              let routes = getCurrentPages()
              let redirectUrl = '/pages/status/login/login?redirect=/pages/index/index'
              if (routes.length) {
                let redirect = routes[routes.length - 1]
                redirectUrl = `/pages/status/login/login?redirect=/${redirect.route}`
              }
              wx.navigateTo({
                url: redirectUrl
              })
            }, 100)
          } else {
            this.runCallback(opt.success, res)
          }
        },
        complete: res => {
          if (opt.queue) {
            if (requestQueue.length != 0) {
              // 如果回调栈还有回调，继续执行
              this.runRequestStack(requestQueue.shift())
            } else {
              requestQueue.isRequest = false
            }
          }
          setTimeout(() => {
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
  getUserInfo(success, fail, force=true) {
    //获取用户信息
    let self = this

    function openSetting(success) {
      wx.openSetting({
        success: res => {
          console.log(res,222222)
          if (res.authSetting["scope.userInfo"]) {
            self.getUserInfo(success)
          } else {
            // 用户设置后依然为拒绝状态
            openSetting(success)
          }
        },
        fail: res => {
          // 拒绝获取用户信息
          if (force) {
            openSetting(success)
          }
        }
      })
    }

    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => {
        this.cacheUserInfo(res.userInfo)
        success(res)
      },
      fail: res => {
        // 拒绝获取用户信息
        if (force) {
          openSetting(success)
        }
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
  $api: ENV == "dev" ? api.dev : api.pro, //接口定义
  $api2: api2, //接口定义2
  globalData: {
    userInfo: null
  }
})