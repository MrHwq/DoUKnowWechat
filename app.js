const openIdUrl = require('./config').openIdUrl

App({
    TAG: 'APP',
    onLaunch: function (options) {
        console.log(this.TAG, 'Launch', options)
    },
    onShow: function (options) {
        console.log(this.TAG, 'Show', options)
    },
    onHide: function (options) {
        console.log(this.TAG, 'Hide', options)
    },
    onError: function (msg) {
        console.error(this.TAG, 'Error', msg)
    },
    globalData: {
        hasLogin: false,
        openid: null
    },
    // lazy loading openid
    getUserOpenId: function (callback) {
        var self = this

        if (self.globalData.openid) {
            callback(null, self.globalData.openid)
        } else {
            wx.login({
                success: function (data) {
                    wx.request({
                        url: openIdUrl,
                        data: {
                            code: data.code
                        },
                        success: function (res) {
                            console.log(this.TAG, '拉取openid成功', res)
                            self.globalData.openid = res.data.openid
                            callback(null, self.globalData.openid)
                        },
                        fail: function (res) {
                            console.log(this.TAG, '拉取用户openid失败，将无法正常使用开放接口等服务', res)
                            callback(res)
                        }
                    })
                },
                fail: function (err) {
                    console.log(this.TAG, 'wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
                    callback(err)
                }
            })
        }
    }
})
