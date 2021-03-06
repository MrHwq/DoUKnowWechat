let DailyBean = require('../../bean/DailyBean');
let TopDailyBean = require('../../bean/TopDailyBean');
let IZhihuApiService = require('../../service/IZhihuApiService');
let { formatDailyTime } = require('../../../util/util');
Page({
    data: {
        top_stories: {
            background: [],
            indicatorDots: true,
            vertical: false,
            autoplay: true,
            interval: 2000,
            duration: 500
        },
        stories: {
            background: [],
        }
    },
    TAG: 'daily',
    innerData: {
        currentTime: undefined,
        isRefresh: false,
        service: new IZhihuApiService()
    },
    pullDownRefresh: function (event) {
        console.log(this.TAG, 'pullDownRefresh');
    },
    setRefreshState: function (isRefresh) {
        if (isRefresh) {
            wx.showNavigationBarLoading();
            wx.showLoading({
                title: 'loading...'
            });
            this.innerData.isRefresh = true;
            return;
        }
        this.innerData.isRefresh = false;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh({
            complete: (res) => {
                wx.hideLoading()
            }
        });
    },
    onRefresh: function (e) {
        if (this.innerData.isRefresh) {
            console.log(this.TAG, 'onRefresh exit for goinng');
            return;
        }
        this.setRefreshState(true);
        this.innerData.service.getLatestNews({
            success: (response) => {
                this.innerData.currentTime = response.data.date;
                this.setData({
                    top_stories: {
                        background: [].concat(
                            response.data.top_stories.map((item) => {
                                let bean = new TopDailyBean(item);
                                return bean;
                            }))
                    },
                    stories: {
                        background: [new DailyBean({ title: '今日新闻', isTitle: true })].concat(
                            response.data.stories.map((item) => {
                                let bean = new DailyBean(item);
                                return bean;
                            }))
                    }
                })
            },
            fail: (fail) => {
                wx.showModal({
                    title: '错误',
                    content: '获取内容错误' + fail,
                });
            },
            complete: () => {
                console.log(this.TAG, 'request complete');
                this.setRefreshState(false);
            }
        });
    },
    onLoadMore: function (e) {
        if (this.innerData.isRefresh) {
            console.log(this.TAG, 'onLoadMore exit for goinng');
            return;
        }
        this.setRefreshState(true);
        this.innerData.service.getBeforeNews({
            date: this.innerData.currentTime,
            success: (response) => {
                let stories = this.data.stories.background;
                stories.push(new DailyBean({
                    title: formatDailyTime(response.data.date),
                    isTitle: true
                }));
                this.innerData.currentTime = response.data.date;
                this.setData({
                    stories: {
                        background: stories.concat(
                            response.data.stories.map((item) => {
                                let bean = new DailyBean(item);
                                return bean;
                            }))
                    }
                })
            },
            complete: () => {
                console.log(this.TAG, 'request complete');
                this.setRefreshState(false);
            }
        });
    },
    onLoad: function (options) {
        console.log(this.TAG, 'onLoad', options);
        this.onRefresh();
    },
    onTapNews: function (object) {
        let item = object.currentTarget.dataset.item;
        wx.navigateTo({
            url: `../dailydetail/dailydetail?id=${item.id}&image=${item.images[0]}`,
            success: (resp) => {
                console.log(this.TAG, resp);
            },
            fail: (fail) => {
                console.error(fail);
            },
            complete: () => {
                console.log(this.TAG, 'complete');
            }
        });
        console.log(this.TAG, item);
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
        console.log(this.TAG, 'scroll:', e);
    },
    scrollToTop: function (e) {
        console.log(this.TAG, 'scrollToTop:', e);
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

