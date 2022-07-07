export default class individualAnswerModel {
    name = "";
    cis = "";
    questions = [];

    constructor(init = undefined, noQuestions = undefined) {
        if(init !== undefined && init !== false) {
            this.name = init.name;
            this.cis = init.cis;
            this.questions = init.questions;
        }
        else if(noQuestions !== undefined) {
            for (let i = 0; i < noQuestions; i++) {
                this.questions.push("");
            }
        }
    }

}