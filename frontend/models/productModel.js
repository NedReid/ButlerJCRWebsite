export default class productModel {
    productName = "";
    productPrice = 0;
    productParams = {};
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.productName = init.productName;
            this.productPrice = init.productPrice
            this.productParams = init.productParams;
            this._id = init._id;
        }

    }

}