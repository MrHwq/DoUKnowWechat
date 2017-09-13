let DailyDetailBean = require('../../bean/DailyDetailBean');
let IZhihuApiService = require('../../service/IZhihuApiService');
let WxParse = require('../../../wxParse/wxParse');
let { createCssTags, createJsTags, createHtmlData } = require('../../../util/htmlUtil');
Page({
    data: {
        detail: {
        },
        // image: undefined
    },
    TAG: 'dailyDetail',
    innerData: {
        service: new IZhihuApiService()
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
        if (!e.id) {
            console.log(this.TAG, e);
            return;
        }
        this.setData({
            image: e.image
        });
        this.setRefreshState(true);
        this.innerData.service.getNewsDetails({
            id: e.id,
            success: (response) => {
                let detail = new DailyDetailBean(response.data);
                console.log(detail);
                this.setData({
                    image: detail.image
                });
                // wx.downloadFile({
                //     url: detail.css[0],
                //     success: (resp) => {
                //         console.log(resp);
                //     }
                // });
                if (false) {
                    console.log(this.TAG, detail);
                    let css = createCssTags(detail.css);
                    console.log(this.TAG, css);
                    let js = createJsTags(detail.js);
                    // detail.body = detail.body.replace('<div class="img-place-holder"></div>',
                    //     '<div class="img-place-holder">' +
                    //     '<img src="' + detail.image + '" style="width:100%; height:200px">'
                    //     + '</div>');
                    detail.body = createHtmlData(detail.body, css, js);
                }
                WxParse.wxParse('article', 'html', detail.body, this, 5);
                // wx.request({
                //     url: detail.css[0],
                //     success: (resp) => {
                //         detail.body = detail.body.replace('<div class="img-place-holder"></div>',
                //             '<div class="img-place-holder">' +
                //             '<img src="' + detail.image + '" style="width:411px; height:200px">'
                //             + '</div>');
                //         console.log(detail.body);
                //         let content = '<style type="text/css">' + resp.data
                //             + '</style>' + detail.body;
                //         WxParse.wxParse('article', 'html', content, this, 5);
                //     }
                // });
            },
            complete: () => {
                console.log(this.TAG, 'request complete');
                this.setRefreshState(false);
            }
        });
    },
    wxParseTagATap: function (object) {
        console.log(this.TAG, object);
        let dataset = object.currentTarget.dataset;
        if (!dataset || !dataset.src) {
            console.log(this.TAG, 'none');
            return;
        }
        wx.navigateTo({
            url: '../web/web?url=' + dataset.src,
            success: (resp) => {
                console.log(this.TAG, resp);
            },
            fail: (fail) => {
                console.error(this.TAG, fail);
            },
            complete: () => {
                console.log(this.TAG, 'complete');
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
        console.log(this.TAG, 'onLoad', options);
        this.onRefresh(options);
    },
    onTapNews: function (object) {

    },
    // Do something when page ready.
    onShow: function () {
        // Do something when page show.
        console.log(this.TAG, 'onShow')
    },
    onHide: function () {
        // Do something when page hide.
        console.log(this.TAG, 'onHide')
    },
    onUnload: function () {
        // Do something when page close.
        console.log(this.TAG, 'onUnload')
    },
    onPullDownRefresh: function () {
        // Do something when pull down.
        console.log(this.TAG, 'onPullDownRefresh');
    },
    onReachBottom: function () {
        // Do something when page reach bottom.
        console.log(this.TAG, 'ononReachBottomLoad')
    },
    onShareAppMessage: function () {
        // return custom share data when user share.
        console.log(this.TAG, 'onShareAppMessage')
    },
    onPageScroll: function () {
        // Do something when page scroll
        console.log(this.TAG, 'onPageScroll')
    },
    kindToggle: function (e) {
        console.log(this.TAG, 'kindToggle');
        var id = e.currentTarget.id, list = this.data.list;
    },
    scroll: function (e) {
        // console.log(this.TAG, 'scroll:', e);
    },
    scrollToTop: function (e) {
        console.log(this.TAG, 'scrollToTop:', e);
    },
    tap: function (e) {
        console.log(this.TAG, 'tap:', e);
    },
    tapMove: function (e) {
        console.log(this.TAG, 'tapMove:', e);
    }
})

