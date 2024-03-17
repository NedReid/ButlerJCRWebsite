import { calendarEventEnum } from "./calendarEventEnum";

export class calendarEventModel {
    title = "";
    category = calendarEventEnum.other;
    startDate = new Date();
    endDate = new Date();
    allDay = false;
    visible = false;
    shortDescription = "";
    location = "";
    link = "";
    description = "<p></p>";
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.title = init.title;
            this.category = init.category;
            this.startDate = new Date(init.startDate);
            this.endDate = new Date(init.endDate);
            this.allDay = init.allDay;
            this.visible = init.visible;
            this.shortDescription = init.shortDescription;
            this.location = init.location;
            this.link = init.link;
            this.description = init.description;
            this._id = init._id;
        }
    }
}
