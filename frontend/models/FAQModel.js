export default class FAQModel {
    category = ""
    question = "";
    answer = "<p></p>";

    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.category = init.category;
            this.question = init.question;
            this.answer = init.answer;
            this._id = init._id;

        }
    }

}