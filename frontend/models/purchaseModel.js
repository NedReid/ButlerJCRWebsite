export default class productModel {
    product = "";
    user = "";
    purchaseTime = Date.now();
    purchaseRef = "";
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.product = init.product;
            this.user = init.user;
            this.purchaseTime = init.purchaseTime;
            this.purchaseRef = init.purchaseRef;
            this._id = init._id;
        }
    }
}
