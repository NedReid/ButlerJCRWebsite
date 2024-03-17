import { SSCEnum } from "./SSCEnum";

export default class SSCModel {
    name = "";
    editors = [];
    desc = "";
    slug = "";
    type = SSCEnum.society;
    page = "<p></p>";
    visible = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.name = init.name;
            this.editors = init.editors;
            this.desc = init.desc;
            this.slug = init.slug;
            this.type = init.type;
            this.page = init.page;
            this.visible = init.visible;
            this._id = init._id;
        }
    }
}
