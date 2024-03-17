import { methodEnum, meetingEnum, roleCategoryEnum } from "./roleEnums";

export default class roleModel {
    name = "";
    slug = "";
    desc = "";
    so = "<p></p>";
    e_meeting = meetingEnum.none;
    e_seats = 1;
    e_type = "Individual";
    e_method = methodEnum.m2;
    e_reqs = "";
    page = "<p></p>";
    category = roleCategoryEnum.other;
    visible = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.name = init.name;
            this.slug = init.slug;
            this.desc = init.desc;
            this.so = init.so;
            this.e_meeting = init.e_meeting;
            this.e_seats = init.e_seats;
            this.e_type = init.e_type;
            this.e_method = init.e_method;
            this.e_reqs = init.e_reqs;
            this.page = init.page;
            this.category = init.category;
            this.visible = init.visible;
            this._id = init._id;
        }
    }
}
