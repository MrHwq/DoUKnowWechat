class SectionInfoBean {
    constructor(object) {
        this.id = object.id;
        this.description = object.description;
        this.thumbnail = object.thumbnail;
        this.name = object.name;
    }
}

class SectionsBean {
    constructor(object) {
        this.data = [];
        for (let idx in object.data) {
            let data = object.data[idx];
            this.data.push(new SectionInfoBean(data));
        }
    }
}

module.exports = {
    SectionsBean: SectionsBean,
    SectionInfoBean: SectionInfoBean
};