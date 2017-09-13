class IZhihuApiService {
    constructor(object = undefined) {
        this.baseUrl = 'http://news-at.zhihu.com/api/4';
    }

    getLatestNews(options) {
        options.url = `${this.baseUrl}/stories/latest`;
        wx.request(options);
    }

    getBeforeNews(options) {
        options.url = `${this.baseUrl}/stories/before/${options.date}`;
        wx.request(options);
    }

    getHotNews(options) {
        options.url = `${this.baseUrl}/news/hot`;
        wx.request(options);
    }

    getNewsDetails(options) {
        options.url = `${this.baseUrl}/story/${options.id}`;
        wx.request(options);
    }

    getSections(options) {
        options.url = `${this.baseUrl}/sections`;
        wx.request(options);
    }

    getSectionsDetails(options) {
        options.url = `${this.baseUrl}/sections/${options.id}`;
        wx.request(options);
    }

    getBeforeSectionsDetails(options) {
        options.url = `${this.baseUrl}/sections/${options.id}/before/${options.timestamp}`;
        wx.request(options);
    }

    getDailyType(options) {
        options.url = `${this.baseUrl}/themes`;
        wx.request(options);
    }

    getThemesDetailsById(options) {
        options.url = `${this.baseUrl}/themes/${options.id}`;
        wx.request(options);
    }
}

module.exports = IZhihuApiService;