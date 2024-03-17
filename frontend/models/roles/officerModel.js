import { meetingEnum } from "./roleEnums";

export default class officerModel {
    username = "";
    name = "";
    role = "";
    election_meeting = meetingEnum.none;
    election_year = 2022;
    page = "<p></p>";
    visible = false;
    current = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.username = init.username;
            this.name = init.name;
            this.role = init.role;
            this.election_meeting = init.election_meeting;
            this.election_year = init.election_year;
            this.page = init.page;
            this.visible = init.visible;
            this.current = init.current;
            this._id = init._id;
        }
    }
}
