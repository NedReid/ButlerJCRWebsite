import React from "react";
import { sendFeedback } from "../../helpers/staticHelper";
import TextEditor from "../global/TextEditor";
import Loading from "../global/Loading";

class Error extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedback: { name: "", email: "", type: "", details: "<p></p>" },
            sent: false,
        };
    }

    handleChange = (event, type) => {
        this.state.feedback[type] = event.target.value;
        console.log(this.state.feedback);
    };

    handleDesc = (desc) => {
        this.state.feedback.details = desc;
    };

    submitButton = async () => {
        this.setState({ sent: undefined });
        await sendFeedback(this.state.feedback);
        this.setState({ sent: true });
    };

    render() {
        return (
            <>
                <div className="mb-4 flex text-center flex-col w-full justify-center place-items-center">
                    <div className="my-4 text-4xl font-semibold">Website Feedback</div>
                    <div className=" my-4">
                        This website is currently in Beta, and is continually improving. As such, if
                        you encounter any issue, big or small, please send us feedback! We can only
                        fix problems we know about, and as such all feedback is greatly appreciated!
                    </div>
                    <div>
                        Furthermore, we are eager to add new features to the site! If you have any
                        ideas or requests, please fill out the form below!
                    </div>
                </div>
                {this.state.sent === undefined && <Loading />}
                {this.state.sent === false && (
                    <div>
                        <label>
                            {" "}
                            Name:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="title"
                                type="text"
                                defaultValue={this.state.feedback.name}
                                onChange={(event) => this.handleChange(event, "name")}
                            />
                        </label>
                        <span className="text-sm italic ml-2">(Optional)</span>
                        <br />

                        <label>
                            {" "}
                            Email:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="title"
                                type="text"
                                defaultValue={this.state.feedback.email}
                                onChange={(event) => this.handleChange(event, "email")}
                            />
                        </label>
                        <span className="text-sm italic ml-2">(Optional)</span>
                        <br />

                        <label className="mr-2 mb-2"> Feedback Type:</label>
                        <select
                            name="type"
                            defaultValue={this.state.feedback.type}
                            onChange={(event) => this.handleChange(event, "type")}
                            className="select select-bordered w-full max-w-xs mb-2"
                        >
                            <option value="Bug Report" key="type">
                                Bug Report
                            </option>
                            <option value="Feature Suggestion" key="type">
                                Feature Suggestion
                            </option>
                            <option value="Question/Support" key="type">
                                Question/Support
                            </option>
                            <option value="General Feedback" key="type">
                                General Feedback
                            </option>
                            <option value="Other" key="type">
                                Other
                            </option>
                        </select>
                        <br />
                        <label> Details:</label>
                        <div className="p-1 rounded border-2 border-slate-500 mb-2">
                            <TextEditor
                                initialValue={this.state.feedback.details}
                                onUpdate={this.handleDesc}
                            />
                        </div>

                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={this.submitButton}
                        >
                            Submit Feedback
                        </button>
                    </div>
                )}
                {this.state.sent === true && <div>Thanks for your feedback! 😀</div>}
            </>
        );
    }
}

export default Error;
