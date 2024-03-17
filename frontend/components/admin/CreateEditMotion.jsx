import React from "react";
import { createMotion, deleteMotion, updateMotion } from "../../helpers/adminHelper";
import motionModel from "../../models/roles/motionModel";
import { meetingToName } from "../../models/roles/roleEnums";
import TextEditor from "../global/TextEditor";

class CreateEditMotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motion: new motionModel(),
            meetings: this.props.meetings,
            currentYear: new Date().getFullYear(),
        };
        if (props.motion !== undefined) {
            console.log("notnull");
            this.state = { motion: props.motion };
            console.log(this.state.motion);
            const currentMeeting = props.meetings.find((meeting) => {
                return meeting._id === this.state.motion.meeting;
            });
            this.state.currentYear = currentMeeting.date.getFullYear();
        }
        console.log(this.state.motion.name);
    }

    changeYear = async (event) => {
        await this.setState({ currentYear: parseInt(event.target.value) });
        console.log("force updated");
        this.forceUpdate();
    };

    handleChange = (event, type) => {
        this.state.motion[type] = event.target.value;
        console.log(this.state.motion);
    };

    handleNumChange = (event, type) => {
        this.state.motion[type] = parseInt(event.target.value);
        console.log(this.state.motion);
    };

    handleBoolChange = (event, type) => {
        this.state.motion[type] = event.target.value === "true";
        console.log(this.state.motion);
    };

    handleMotionDate = (event) => {
        this.state.motion.date = event;
    };

    handleNotes = (page) => {
        this.state.motion.notes = page;
    };

    handleBelieves = (page) => {
        this.state.motion.believes = page;
    };

    handleResolves = (page) => {
        this.state.motion.resolves = page;
    };

    submitButton = async () => {
        if (this.props.motion !== undefined) {
            console.log(this.state.motion);
            await updateMotion(this.state.motion);
        } else {
            await createMotion(this.state.motion);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    deleteButton = async () => {
        await deleteMotion(this.state.motion);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    render() {
        console.log("RENDERING");
        return (
            <>
                {" "}
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <label>
                        Motion Name:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="name"
                            type="text"
                            defaultValue={this.state.motion.name}
                            onChange={(event) => this.handleChange(event, "name")}
                        />
                    </label>

                    <label>Motion Meeting:</label>

                    <label>
                        {" "}
                        Year:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="election_year"
                            type="number"
                            defaultValue={this.state.currentYear}
                            onChange={this.changeYear}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </label>
                    <br />
                    {this.state.currentYear !== "" && (
                        <select
                            defaultValue={this.state.motion.meeting}
                            onChange={(event) => this.handleChange(event, "meeting")}
                            key={this.state.currentYear}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option value="">Select Meeting</option>
                            {this.props.meetings
                                .filter((meeting) => {
                                    return meeting.date.getFullYear() === this.state.currentYear;
                                })
                                .map((meeting, index) => {
                                    return (
                                        <option
                                            value={meeting._id}
                                            key={this.typeSelect + "_" + index}
                                        >
                                            {meetingToName(meeting.m_type) +
                                                " " +
                                                meeting.date.getFullYear()}
                                        </option>
                                    );
                                })}
                        </select>
                    )}

                    <label>This JCR Notes:</label>
                    <div className="p-1 rounded border-2 border-slate-500">
                        <TextEditor
                            initialValue={this.state.motion.notes}
                            onUpdate={this.handleNotes}
                        />
                    </div>

                    <label>This JCR Believes:</label>
                    <div className="p-1 rounded border-2 border-slate-500">
                        <TextEditor
                            initialValue={this.state.motion.notes}
                            onUpdate={this.handleBelieves}
                        />
                    </div>

                    <label>This JCR Resolves:</label>
                    <div className="p-1 rounded border-2 border-slate-500">
                        <TextEditor
                            initialValue={this.state.motion.notes}
                            onUpdate={this.handleResolves}
                        />
                    </div>

                    <label>
                        Proposer:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="proposer"
                            type="text"
                            defaultValue={this.state.motion.proposer}
                            onChange={(event) => this.handleChange(event, "proposer")}
                        />
                    </label>

                    <label>
                        Seconder:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="seconder"
                            type="text"
                            defaultValue={this.state.motion.seconder}
                            onChange={(event) => this.handleChange(event, "seconder")}
                        />
                    </label>

                    <label> Ended:</label>
                    <span>
                        <label>
                            <input
                                defaultChecked={this.state.motion.ended === false}
                                onChange={(event) => this.handleBoolChange(event, "ended")}
                                type="radio"
                                name={this.state.motion._id + "ended"}
                                value={false}
                            />
                            False
                        </label>
                        <label className="ml-2">
                            <input
                                defaultChecked={this.state.motion.ended === true}
                                onChange={(event) => this.handleBoolChange(event, "ended")}
                                type="radio"
                                name={this.state.motion._id + "ended"}
                                value={true}
                            />
                            True
                        </label>
                    </span>

                    <label> Passed:</label>
                    <span>
                        <label>
                            <input
                                defaultChecked={this.state.motion.passed === false}
                                onChange={(event) => this.handleBoolChange(event, "passed")}
                                type="radio"
                                name={this.state.motion._id + "passed"}
                                value={false}
                            />
                            False
                        </label>
                        <label className="ml-2">
                            <input
                                defaultChecked={this.state.motion.passed === true}
                                onChange={(event) => this.handleBoolChange(event, "passed")}
                                type="radio"
                                name={this.state.motion._id + "passed"}
                                value={true}
                            />
                            True
                        </label>
                    </span>

                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Motion?!</h3>
                            <p className="py-4">Are you sure you want to remove this motion?</p>
                            <div className="modal-action">
                                <label
                                    onClick={this.deleteButton}
                                    htmlFor="my-modal"
                                    className="btn"
                                >
                                    Yes
                                </label>
                                <label htmlFor="my-modal" className="btn">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.submitButton}
                >
                    Submit Motion
                </button>
                {this.props.motion !== undefined && (
                    <label
                        htmlFor="my-modal"
                        className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button"
                    >
                        Delete Motion
                    </label>
                )}
            </>
        );
    }
}

export default CreateEditMotion;
