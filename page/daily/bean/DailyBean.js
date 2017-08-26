class DailyBean {
    constructor(object) {
        this.title = object.title;
        this.isTitle = object.isTitle || false;
        if (!this.isTitle) {
            this.images = object.images;
            this.ga_prefix = object.ga_prefix;
            this.id = object.id;
            this.type = object.type;
            this.multipic = object.multipic || false;
        }
    }
}

module.exports = DailyBean;