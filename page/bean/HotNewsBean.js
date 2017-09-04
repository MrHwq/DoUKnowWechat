class HotNewsInfo {
    constructor(object) {
        this.title = object.title;
        this.thumbnail = object.thumbnail;
        this.url = object.url;
        this.news_id = object.news_id;
    }
}
class HotNewsBean {
    constructor(object) {
        this.recent = [];
        for (let id in object.recent) {
            let newsInfo = new HotNewsInfo(object.recent[id]);
            this.recent.push(newsInfo);
        }
    }
}

module.exports = {
    HotNewsBean: HotNewsBean,
    HotNewsInfo: HotNewsInfo
};