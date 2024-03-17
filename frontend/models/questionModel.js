import { questionTypeEnum } from "./questionTypeEnum";

export default class questionModel {
    questionText = "";
    questionType = questionTypeEnum.text;
    data = [];
    id = 0;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.questionText = init.questionText;
            this.questionType = init.questionType;
            this.data = init.data;
            this.id = init.id;
        }
    }
}
