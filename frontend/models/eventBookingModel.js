export default class eventBookingModel {
    groupSize = undefined;
    individualAnswers = [];
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.groupSize = init.groupSize;
            this.individualAnswers = init.individualAnswers;
            this._id = init._id;
        }

    }

}