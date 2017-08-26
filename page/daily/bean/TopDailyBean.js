class TopDailyBean {
    constructor(object) {
        this.image = object.image;
        this.title = object.title;
        this.ga_prefix = object.ga_prefix;
        this.id = object.id;
        this.type = object.type;
    }
}

module.exports = TopDailyBean;