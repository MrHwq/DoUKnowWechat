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
        if (!e.url) {
            return;
        }
        this.setRefreshState(true);
        let url = e.url;
        wx.request({
            url: url,
            success: (response) => {
                WxParse.wxParse('article', 'html', response.data, this, 5);
            },
            complete: () => {
                console.log('request complete');
                this.setRefreshState(false);
            }
        });
    },
    wxParseTagATap: (object) => {
        console.log(object);
        // let dataset = object.currentTarget.dataset;
        // if (!dataset || !dataset.src) {
        //     console.log('none');
        //     return;
        // }
        // wx.navigateTo({
        //     url: dataset.src,
        // })
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
        console.log('tap:');
        console.log(e);
    },
    tapMove: function (e) {
        console.log('tapMove:');
        console.log(e);
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    }
})
