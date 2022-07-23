
export class editableModel {
    name = "";
    content = "<p></p>";
    page = "";
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.content = init.content;
            this.page = init.page;
            this._id = init._id;
        }

    }

}