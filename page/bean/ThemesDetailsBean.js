class SubjectDailyBean {
    constructor(object) {
        this.color = object.color;
        this.thumbnail = object.thumbnail;
        this.description = object.description;
        this.id = object.id;
        this.name = object.name;
    }
}

class ThemesDetailsBean {
    constructor(object) {
        this.limit = object.limit;
        this.subscribed = object.subscribed;
        this.others = [];
        for (let idx in object.others) {
            let other = object.others[idx];
            this.others.push(new SubjectDailyBean(other));
        }
    }
}

module.exports = {
    ThemesDetailsBean: ThemesDetailsBean,
    SubjectDailyBean: SubjectDailyBean
};