let DailyDetailBean = require('../../bean/DailyDetailBean');
let WxParse = require('../../../wxParse/wxParse.js');
Page({
    data: {
        detail: {

        }
    },
    pullDownRefresh: function (event) {
        console.log('pullDownRefresh');
    },
    setRefreshState: function (isRefresh) {
        if (isRefresh) {
            wx.showNavigationBarLoading();
            wx.showLoading({
                title: 'loading...'
            });
            return;
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh({
            complete: (res) => {
                wx.hideLoading()
            }
        });
    },
    onRefresh: function (e) {
        console.log(e);
        if (!e.id) {
            return;
        }
        this.setRefreshState(true);
        let id = e.id;
        let baseUrl = 'http://news-at.zhihu.com/api/4/';
        wx.request({
            url: baseUrl + 'story/' + id,
            success: (response) => {
                let detail = new DailyDetailBean(response.data);
                // console.log(detail);
                // this.setData({
                //     detail: detail
                // });
                wx.downloadFile({
                    url: detail.css[0],
                    success: (resp) => {
                        console.log(resp);
                    }
                });
                detail.body = detail.body.replace('<div class="img-place-holder"></div>',
                    '<div class="img-place-holder">' +
                    '<img src="' + detail.image + '" style="width:411px; height:200px">'
                    + '</div>');
                console.log(detail.body);
                let content = '<style type="text/css">'
                    + '</style>' + detail.body;
                WxParse.wxParse('article', 'html', content, this, 5);
            },
            complete: () => {
                console.log('request complete');
                this.setRefreshState(false);
            }
        });
    },
    wxParseTagATap: (object) => {
        console.log(object);
        let dataset = object.currentTarget.dataset;
        if (!dataset || !dataset.src) {
            console.log('none');
            return;
        }
        wx.navigateTo({
            url: '../web/web?url=' + dataset.src,
            success: (resp) => {
                console.log(resp);
            },
            fail: (fail) => {
                console.error(fail);
            },
            complete: () => {
                console.log('complete');
            }
        });
        // wx.navigateTo({
        //     url: '../dailydetail/dailydetail?id=' + 9590958,
        //     success: (resp) => {
        //         console.log(resp);
        //     },
        //     fail: (fail) => {
        //         console.error(fail);
        //     },
        //     complete: () => {
        //         console.log('complete');
        //     }
        // });
    },
    onLoadMore: function (e) {
    },
    onLoad: function (options) {
        console.log('daily onLoad')
        console.log(options);
        this.onRefresh(options);
    },
    onTapNews: function (object) {

    },
    // Do something when page ready.
    onShow: function () {
        // Do something when page show.
        console.log('daily onShow')
    },
    onHide: function () {
        // Do something when page hide.
        console.log('daily onHide')
    },
    onUnload: function () {
        // Do something when page close.
        console.log('daily onUnload')
    },
    onPullDownRefresh: function () {
        // Do something when pull down.
        console.log('daily onPullDownRefresh');
    },
    onReachBottom: function () {
        // Do something when page reach bottom.
        console.log('daily ononReachBottomLoad')
    },
    onShareAppMessage: function () {
        // return custom share data when user share.
        console.log('daily onShareAppMessage')
    },
    onPageScroll: function () {
        // Do something when page scroll
        console.log('daily onPageScroll')
    },
    kindToggle: function (e) {
        console.log('kindToggle');
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    },
    scroll: function (e) {
        console.log('scroll:');
        console.log(e);
    },
    scrollToTop: function (e) {
        console.log('scrollToTop:');
        console.log(e);
        this.setAction({
            scrollTop: 0
        })
    },
    tap: function (e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1],
                    scrollTop: (i + 1) * 200
                })
                break
            }
        }
    },
    tapMove: function (e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    }
})

