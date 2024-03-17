import React from "react";
import { getCandidates, getMeetingHeaders, getRoleHeaders } from "../../helpers/adminHelper";
import CreateEditCandidate from "./CreateEditCandidate";
import { meetingToName } from "../../models/roles/roleEnums";

class Candidates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingCandidate: false,
            candidates: [],
            currentCandidate: undefined,
            typeSelect: new Date().getFullYear(),
            meetingSelect: "",
            meetings: [],
        };
        this.candidateSelect = React.createRef();
    }

    async componentDidMount() {
        const meetings = await getMeetingHeaders();
        const candidates = await getCandidates();
        const roles = await getRoleHeaders();
        this.setState({ candidates: candidates, meetings: meetings, roles: roles });
        console.log(candidates);
    }

    editCandidate = (event) => {
        const currentCandidate = this.state.candidates.find((candidate) => {
            return candidate._id === event.target.value;
        });
        console.log(currentCandidate);
        this.setState({ currentCandidate: currentCandidate });
    };

    onUpdated = async () => {
        this.currentCandidate = undefined;
        this.setState({ candidates: [] });
        const candidates = await getCandidates();
        this.setState({ candidates: candidates });
    };

    onCreated = async () => {
        this.setState({ addingCandidate: false });
        this.setState({ candidates: [] });
        const candidates = await getCandidates();
        this.setState({ candidates: candidates });
    };

    changeTargetType = async (event) => {
        this.setState({ currentCandidate: undefined, meetingSelect: "" });
        await this.setState({ typeSelect: parseInt(event.target.value) });
        this.forceUpdate();
    };

    changeTargetMeeting = async (event) => {
        this.setState({ currentCandidate: undefined });
        await this.setState({ meetingSelect: event.target.value });
        this.forceUpdate();
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingCandidate === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingCandidate: true });
                        }}
                    >
                        Create Candidate
                    </button>
                )}
                {this.state.addingCandidate === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingCandidate: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditCandidate
                            closeTab={this.onCreated}
                            meetings={this.state.meetings}
                            roles={this.state.roles}
                        />
                    </>
                )}
                <br />
                Edit Current Candidate:
                <br />
                <label>
                    {" "}
                    Year:
                    <input
                        className=" ml-2 mb-2 rounded border-2 border-slate-500"
                        name="election_year"
                        type="number"
                        defaultValue={new Date().getFullYear()}
                        onChange={this.changeTargetType}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </label>
                <br />
                {this.state.typeSelect !== "" && (
                    <select
                        defaultValue=""
                        onChange={this.changeTargetMeeting}
                        key={this.state.typeSelect}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select Meeting</option>
                        {this.state.meetings
                            .filter((meeting) => {
                                return meeting.date.getFullYear() === this.state.typeSelect;
                            })
                            .map((meeting, index) => {
                                return (
                                    <option value={meeting._id} key={this.typeSelect + "_" + index}>
                                        {meetingToName(meeting.m_type) +
                                            " " +
                                            meeting.date.getFullYear()}
                                    </option>
                                );
                            })}
                    </select>
                )}
                <br />
                {this.state.meetingSelect !== "" && (
                    <select
                        defaultValue=""
                        onChange={this.editCandidate}
                        key={this.state.meetingSelect}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select Candidate</option>
                        {this.state.candidates
                            .filter((candidate) => {
                                return candidate.meeting === this.state.meetingSelect;
                            })
                            .map((candidate, index) => {
                                return (
                                    <option
                                        value={candidate._id}
                                        key={this.meetingSelect + "_" + index}
                                    >
                                        {candidate.name}
                                    </option>
                                );
                            })}
                    </select>
                )}
                <br />
                {this.state.currentCandidate !== undefined &&
                    this.state.candidates.map((candidate, index) => {
                        if (candidate === this.state.currentCandidate) {
                            return (
                                <CreateEditCandidate
                                    closeTab={this.onUpdated}
                                    key={index}
                                    candidate={this.state.currentCandidate}
                                    meetings={this.state.meetings}
                                    roles={this.state.roles}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

export default Candidates;
