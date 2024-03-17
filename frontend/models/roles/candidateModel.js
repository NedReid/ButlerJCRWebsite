export default class candidateModel {
    name = "";
    manifesto = "<p></p>";
    video = "";
    poster = "";
    promotionalImage = "";
    role = "";
    meeting = "";
    ended = false;
    passed = false;
    _id = undefined;

    constructor(init = undefined) {
        if (init !== undefined) {
            this.name = init.name;
            this.manifesto = init.manifesto;
            this.video = init.video;
            this.poster = init.poster;
            this.promotionalImage = init.promotionalImage;
            this.role = init.role;
            this.meeting = init.meeting;
            this.ended = init.ended;
            this.passed = init.passed;
            this._id = init._id;
        }
    }
}
