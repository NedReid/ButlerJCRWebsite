import React from "react";
import { createMeeting, updateMeeting, deleteMeeting } from "../../helpers/adminHelper";
import meetingModel from "../../models/roles/meetingModel";
import { meetingToName, meetingEnum } from "../../models/roles/roleEnums";
import TextEditor from "../global/TextEditor";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";

class CreateEditMeeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = { meeting: new meetingModel() };
        if (props.meeting !== undefined) {
            console.log("notnull");
            this.state = { meeting: props.meeting };
            console.log(this.state.meeting);
        }
        console.log(this.state.meeting.name);
    }

    handleChange = (event, type) => {
        this.state.meeting[type] = event.target.value;
        console.log(this.state.meeting);
    };

    handleNumChange = (event, type) => {
        this.state.meeting[type] = parseInt(event.target.value);
        console.log(this.state.meeting);
    };

    handleBoolChange = (event, type) => {
        this.state.meeting[type] = event.target.value === "true";
        console.log(this.state.meeting);
    };

    handleMeetingDate = (event) => {
        this.state.meeting.date = event;
    };

    handlePage = (page) => {
        this.state.meeting.page = page;
    };

    submitButton = async () => {
        if (this.props.meeting !== undefined) {
            console.log(this.state.meeting);
            await updateMeeting(this.state.meeting);
        } else {
            await createMeeting(this.state.meeting);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    deleteButton = async () => {
        await deleteMeeting(this.state.meeting);
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
                        {" "}
                        Meeting Date:
                        <DateTimePicker
                            disableCalendar={true}
                            disableClock={true}
                            className="ml-2 mb-2"
                            minDate={new Date(2000, 1)}
                            maxDate={new Date(3000, 1)}
                            name="ticketReleaseDate"
                            value={this.state.meeting.date}
                            onChange={this.handleMeetingDate}
                        />
                    </label>

                    <label>Meeting Type:</label>
                    <select
                        name="m_type"
                        defaultValue={this.state.meeting.m_type}
                        onChange={(event) => this.handleNumChange(event, "m_type")}
                        className="select select-bordered w-full max-w-xs"
                    >
                        {Object.values(meetingEnum).map((meeting) => {
                            return (
                                <option value={meeting} key="m_type">
                                    {meetingToName(meeting)}
                                </option>
                            );
                        })}
                    </select>

                    <label>Meeting Page:</label>
                    <div className="p-1 rounded border-2 border-slate-500">
                        <TextEditor
                            initialValue={this.state.meeting.page}
                            onUpdate={this.handlePage}
                        />
                    </div>

                    <label> Visible:</label>
                    <span>
                        <label>
                            <input
                                defaultChecked={this.state.meeting.visible === false}
                                onChange={(event) => this.handleBoolChange(event, "visible")}
                                type="radio"
                                name={this.state.meeting._id + "visible"}
                                value={false}
                            />
                            False
                        </label>
                        <label className="ml-2">
                            <input
                                defaultChecked={this.state.meeting.visible === true}
                                onChange={(event) => this.handleBoolChange(event, "visible")}
                                type="radio"
                                name={this.state.meeting._id + "visible"}
                                value={true}
                            />
                            True
                        </label>
                    </span>

                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Meeting?!</h3>
                            <p className="py-4">Are you sure you want to remove this meeting?</p>
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
                    Submit Meeting
                </button>
                {this.props.meeting !== undefined && (
                    <label
                        htmlFor="my-modal"
                        className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button"
                    >
                        Delete Meeting
                    </label>
                )}
            </>
        );
    }
}

export default CreateEditMeeting;
