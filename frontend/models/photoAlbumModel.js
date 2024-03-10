export default class productModel {
    name = "";
    date = new Date();
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.date = init.date;
            this._id = init._id;
        }

    }

}