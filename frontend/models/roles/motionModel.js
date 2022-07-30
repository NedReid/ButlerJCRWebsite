export default class motionModel {
    notes = "<p></p>";
    believes = "<p></p>";
    resolves = "<p></p>";
    proposer = "";
    seconder = "";
    meeting = "";
    ended = false;
    passed = false;
    _id = undefined;

    constructor(init = undefined) {
        if(init !== undefined) {
            this.notes = init.notes;
            this.believes = init.believes;
            this.resolves = init.resolves;
            this.proposer = init.proposer;
            this.seconder = init.seconder;
            this.meeting = init.meeting;
            this.ended = init.ended;
            this.passed = init.passed;
            this._id = init._id;
        }

    }

}