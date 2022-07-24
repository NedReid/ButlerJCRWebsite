export default class SSCModel {
    username = ""
    events = false;
    finance = false;
    SSCs = false;
    pagePerms = false;
    adminPerms = false;
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.username = init.username;
            this.events = init.events;
            this.finance = init.finance;
            this.SSCs = init.SSCs;
            this.pagePerms = init.pagePerms;
            this.adminPerms = init.adminPerms;
            this._id = init._id;

        }

    }

}