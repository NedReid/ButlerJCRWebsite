export default class adminPermModel {
    username = "";
    events = false;
    finance = false;
    SSCs = false;
    pagePerms = false;
    adminPerms = false;
    democracy = false;
    photos = false;
    freshers = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.username = init.username;
            this.events = init.events;
            this.finance = init.finance;
            this.SSCs = init.SSCs;
            this.pagePerms = init.pagePerms;
            this.adminPerms = init.adminPerms;
            this.democracy = init.democracy;
            this.postCategories = init.postCategories;
            this.photos = init.photos;
            this.freshers = init.freshers;
            this._id = init._id;
        }
    }
}
