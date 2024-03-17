export default class whosWhoModel {
    category = "";
    subcategory = "";
    name = "";
    role = "";
    pronouns = "";
    email = "";
    photo = "";
    order = 0;

    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.category = init.category;
            this.subcategory = init.subcategory;
            this.name = init.name;
            this.role = init.role;
            this.pronouns = init.pronouns;
            this.email = init.email;
            this.photo = init.photo;
            this._id = init._id;
            this.order = init.order;
        }
    }
}
