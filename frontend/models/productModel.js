export default class productModel {
    name = "";
    price = 0;
    params = {};
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.price = init.price;
            this.params = init.params;
            this._id = init._id;
        }

    }

}