import {meetingEnum, meetingToSlug} from './roleEnums'

export default class meetingModel {
    date = new Date();
    m_type = meetingEnum.none
    meeting = ""
    page = "<p></p>";
    visible = false;
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.date = new Date(init.date);
            this.m_type = init.m_type;
            this.page = init.page;
            this.visible = init.visible;
            this.meeting = init.meeting;
            this._id = init._id;
        }

    }

    getSlug = () => {
        if (this.m_type === meetingEnum.emergency) {
            return "emergency-" + this.date.getDate().toString() + "-" + this.date.getMonth().toString() + "-" + this.date.getFullYear().toString();
        }
        else if (this.m_type === meetingEnum.None) {
            return "meeting-" + this.date.getDate().toString() + "-" + this.date.getMonth().toString() + "-" + this.date.getFullYear().toString();
        }
        else {
            return meetingToSlug(this.m_type) + "-" + this.date.getFullYear().toString();
        }
    }

}