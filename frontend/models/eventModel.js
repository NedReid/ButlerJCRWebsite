import {selectionModeEnum} from "./selectionModeEnum";

export default class eventModel {
    name = "";
    ticketReleaseDate = new Date();
    ticketReleaseDeadline = new Date();
    noTickets = 0;
    selectionMode = selectionModeEnum.firstComeFirstServe;
    groupSizes = {1:false,2:false,3:false,4:false,5:false,6:false,8:false,10:false,12:false};
    desc = "<p></p>";


    constructor(init = undefined) {
        if(!!init) {
            this.name = init.name;
            this.ticketReleaseDate = init.ticketReleaseDate;
            this.ticketReleaseDeadline = init.ticketReleaseDeadline;
            this.noTickets = init.noTickets;
            this.selectionMode = init.selectionMode;
            this.groupSizes = init.groupSizes;
            this.desc = init.desc;
        }

    }

}