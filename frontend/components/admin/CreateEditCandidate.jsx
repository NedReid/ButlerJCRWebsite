import React from "react";
import { createCandidate, deleteCandidate, updateCandidate } from "../../helpers/adminHelper";
import candidateModel from "../../models/roles/candidateModel";
import { meetingToName, roleCategoryEnum, roleCategoryNames } from "../../models/roles/roleEnums";
import TextEditor from "../global/TextEditor";

class CreateEditCandidate extends React.Component {
    constructor(props) {
        super(props);
        console.log("ROLES");
        console.log(props.roles);
        console.log("ROLES");
        this.state = {
            candidate: new candidateModel(),
            meetings: this.props.meetings,
            currentYear: new Date().getFullYear(),
            currentCategory: roleCategoryEnum.other,
        };
        if (props.candidate !== undefined) {
            console.log("notnull");
            this.state = { candidate: props.candidate };
            console.log(this.state.candidate);
            const currentMeeting = props.meetings.find((meeting) => {
                return meeting._id === this.state.candidate.meeting;
            });
            const currentRole = props.roles.find((meeting) => {
                return meeting._id === this.state.candidate.role;
            });
            this.state.currentYear = currentMeeting.date.getFullYear();
            this.state.currentCategory = currentRole.category;
        }
        console.log(this.state.candidate.name);
    }

    changeCategoryType = async (event) => {
        await this.setState({ currentCategory: parseInt(event.target.value) });
        console.log("force updated");
        this.forceUpdate();
    };

    changeYear = async (event) => {
        await this.setState({ currentYear: parseInt(event.target.value) });
        console.log("force updated");
        this.forceUpdate();
    };

    handleChange = (event, type) => {
        this.state.candidate[type] = event.target.value;
        console.log(this.state.candidate);
    };

    handleImageChange = async (event, type) => {
        let im = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.state.candidate[type] = reader.result;
            this.forceUpdate();
        };
        reader.readAsDataURL(im);
    };

    handleNumChange = (event, type) => {
        this.state.candidate[type] = parseInt(event.target.value);
        console.log(this.state.candidate);
    };

    handleBoolChange = (event, type) => {
        this.state.candidate[type] = event.target.value === "true";
        console.log(this.state.candidate);
    };

    handleCandidateDate = (event) => {
        this.state.candidate.date = event;
    };

    handleManifesto = (page) => {
        this.state.candidate.manifesto = page;
    };

    handleBelieves = (page) => {
        this.state.candidate.believes = page;
    };

    handleResolves = (page) => {
        this.state.candidate.resolves = page;
    };

    submitButton = async () => {
        if (this.props.candidate !== undefined) {
            console.log(this.state.candidate);
            await updateCandidate(this.state.candidate);
        } else {
            await createCandidate(this.state.candidate);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    deleteButton = async () => {
        await deleteCandidate(this.state.candidate);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    render() {
        console.log("RENDERING", this.state.currentCategory);
        return (
            <>
                {" "}
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <label>
                        Candidate Name:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="name"
                            type="text"
                            defaultValue={this.state.candidate.name}
                            onChange={(event) => this.handleChange(event, "name")}
                        />
                    </label>

                    <label>Candidate Manifesto: (leave blank to omit)</label>
                    <div className="p-1 rounded border-2 border-slate-500">
                        <TextEditor
                            initialValue={this.state.candidate.manifesto}
                            onUpdate={this.handleManifesto}
                        />
                    </div>

                    <label>
                        Candidate Video (Leave Blank to omit. Youtube videos pls!):
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="video"
                            type="text"
                            defaultValue={this.state.candidate.video}
                            onChange={(event) => this.handleChange(event, "video")}
                        />
                    </label>

                    <label>
                        Candidate Poster:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="poster"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(event) => this.handleImageChange(event, "poster")}
                        />
                        {this.state.candidate.poster !== "" &&
                            (this.state.candidate.poster.startsWith("data:application/pdf") ? (
                                <div />
                            ) : (
                                <img
                                    className="h-24 object-contain"
                                    src={this.state.candidate.poster}
                                />
                            ))}
                    </label>

                    <label>
                        Candidate Promotional Image:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="promotionalImage"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(event) => this.handleImageChange(event, "promotionalImage")}
                        />
                        {this.state.candidate.promotionalImage !== "" &&
                            (this.state.candidate.promotionalImage.startsWith(
                                "data:application/pdf",
                            ) ? (
                                <div />
                            ) : (
                                <img
                                    className="h-24 object-contain"
                                    src={this.state.candidate.promotionalImage}
                                />
                            ))}{" "}
                    </label>

                    <label>Candidate Meeting:</label>
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
                            defaultValue={this.state.candidate.meeting}
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

                    <label>Candidate Role:</label>
                    <select
                        name="category"
                        defaultValue={this.state.currentCategory}
                        onChange={this.changeCategoryType}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select Category</option>
                        {Object.values(roleCategoryEnum).map((roleCategory) => {
                            return (
                                <option value={roleCategory} key="officerType">
                                    {roleCategoryNames(roleCategory)}
                                </option>
                            );
                        })}
                    </select>
                    {this.state.currentCategory !== "" && (
                        <select
                            key={this.state.currentCategory}
                            name="category"
                            defaultValue={this.state.candidate.role}
                            onChange={(event) => this.handleChange(event, "role")}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option value="">Select Officer</option>
                            {this.props.roles
                                .filter((role) => {
                                    return role.category === this.state.currentCategory;
                                })
                                .map((role, index) => {
                                    return (
                                        <option
                                            value={role._id}
                                            key={this.currentCategory + "_" + index}
                                        >
                                            {role.name}
                                        </option>
                                    );
                                })}
                        </select>
                    )}

                    <label> Ended:</label>
                    <span>
                        <label>
                            <input
                                defaultChecked={this.state.candidate.ended === false}
                                onChange={(event) => this.handleBoolChange(event, "ended")}
                                type="radio"
                                name={this.state.candidate._id + "ended"}
                                value={false}
                            />
                            False
                        </label>
                        <label className="ml-2">
                            <input
                                defaultChecked={this.state.candidate.ended === true}
                                onChange={(event) => this.handleBoolChange(event, "ended")}
                                type="radio"
                                name={this.state.candidate._id + "ended"}
                                value={true}
                            />
                            True
                        </label>
                    </span>

                    <label> Passed:</label>
                    <span>
                        <label>
                            <input
                                defaultChecked={this.state.candidate.passed === false}
                                onChange={(event) => this.handleBoolChange(event, "passed")}
                                type="radio"
                                name={this.state.candidate._id + "passed"}
                                value={false}
                            />
                            False
                        </label>
                        <label className="ml-2">
                            <input
                                defaultChecked={this.state.candidate.passed === true}
                                onChange={(event) => this.handleBoolChange(event, "passed")}
                                type="radio"
                                name={this.state.candidate._id + "passed"}
                                value={true}
                            />
                            True
                        </label>
                    </span>

                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Candidate?!</h3>
                            <p className="py-4">Are you sure you want to remove this candidate?</p>
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
                    Submit Candidate
                </button>
                {this.props.candidate !== undefined && (
                    <label
                        htmlFor="my-modal"
                        className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button"
                    >
                        Delete Candidate
                    </label>
                )}
            </>
        );
    }
}

export default CreateEditCandidate;
