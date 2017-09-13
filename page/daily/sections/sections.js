let IZhihuApiService = require('../../service/IZhihuApiService');
let { SectionsBean, SectionInfoBean } = require('../../bean/SectionsBean');
Page({
    data: {
        sections: [],
    },
    TAG: 'sections',
    innerData: {
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
        this.innerData.service.getSections({
            success: (response) => {
                let sections = new SectionsBean(response.data);
                console.log(this.TAG, sections);
                this.setData({ sections: sections.data });
            },
            complete: () => {
                console.log(this.TAG, 'request complete');
                this.setRefreshState(false);
            }
        });
    },
    onLoadMore: function (e) {
        console.log(this.TAG, 'onLoadMore nothing');
    },
    onLoad: function (options) {
        console.log(this.TAG, 'onLoad', options);
        this.onRefresh();
    },
    onTapNews: function (object) {
        let item = object.currentTarget.dataset.item;
        wx.navigateTo({
            url: `../dailydetail/dailydetail?id=${item.news_id}&image=${item.thumbnail}`,
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

