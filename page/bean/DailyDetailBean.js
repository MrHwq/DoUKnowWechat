class DailyDetailBean {
    constructor(object) {
        this.id = object.id;
        this.type = object.type;
        this.title = object.title;
        this.image = object.image;
        this.image_source = object.image_source;
        this.ga_prefix = object.ga_prefix;
        this.share_url = object.share_url;
        this.body = object.body;
        this.js = object.js;
        this.css = object.css;
    }
}

module.exports = DailyDetailBean;