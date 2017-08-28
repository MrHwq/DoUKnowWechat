let DailyBean = require('../../bean/DailyBean');
let TopDailyBean = require('../../bean/TopDailyBean');
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
    innerData: {
        currentTime: undefined,
        isRefresh: false,
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
            console.log('onRefresh exit for goinng');
            return;
        }
        this.setRefreshState(true);
        let baseUrl = 'http://news-at.zhihu.com/api/4/';
        wx.request({
            url: baseUrl + 'stories/latest',
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
            complete: () => {
                console.log('request complete');
                this.setRefreshState(false);
            }
        });
    },
    onLoadMore: function (e) {
        if (this.innerData.isRefresh) {
            console.log('onLoadMore exit for goinng');
            return;
        }
        this.setRefreshState(true);
        let baseUrl = 'http://news-at.zhihu.com/api/4/';
        wx.request({
            url: baseUrl + 'stories/before/' + this.innerData.currentTime,
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
                console.log('request complete');
                this.setRefreshState(false);
            }
        });
    },
    onLoad: function (options) {
        console.log('daily onLoad')
        console.log(options);
        this.onRefresh();
    },
    onTapNews: function (object) {
        let id = object.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../dailydetail/dailydetail?id=' + id,
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
        console.log(id);
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

