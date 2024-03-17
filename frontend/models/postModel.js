export default class postModel {
    title = "";
    editor = "";
    category = "";
    post = "<p></p>";
    date = Date.now();
    visible = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.title = init.title;
            this.editor = init.editor;
            this.category = init.category;
            this.date = init.date;
            this.post = init.post;
            this.visible = init.visible;
            this._id = init._id;
        }
    }
}
