import {meetingEnum} from './roleEnums'

export default class meetingModel {
    date = new Date();
    m_type = meetingEnum.none
    page = "<p></p>";
    visible = false;
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.date = init.date;
            this.m_type = init.m_type;
            this.page = init.page;
            this.visible = init.visible;
            this._id = init._id;
        }

    }

}