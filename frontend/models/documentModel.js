import {documentEnum} from "./documentEnum";

export class documentModel {
    name = "";
    category = documentEnum.other;
    date = new Date();
    address = "";
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.category = init.category;
            this.date = new Date(init.date);
            this.address = init.address;
            this._id = init._id;
        }

    }

}