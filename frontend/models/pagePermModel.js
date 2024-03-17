export default class SSCModel {
    page = "";
    editors = [];
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.page = init.page;
            this.editors = init.editors;
            this._id = init._id;
        }
    }
}
