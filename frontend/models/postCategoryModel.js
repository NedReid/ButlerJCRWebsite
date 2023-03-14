export default class postCategoryModel {
    name = "";
    editors = [];
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.editors = init.editors;
            this._id = init._id;
        }
    }

}