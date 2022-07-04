export default class individualAnswerModel {
    name = "";
    cis = "";
    questions = [];

    constructor(init = undefined) {
        if(init !== undefined) {
            this.name = init.name;
            this.cis = init.cis;
            this.questions = init.questions;
        }

    }

}