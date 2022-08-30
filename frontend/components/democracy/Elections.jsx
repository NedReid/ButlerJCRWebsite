import React from "react";
import {createEvent, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import roleModel from "../../models/roles/roleModel";
import {AiFillEdit, AiOutlineSave, AiOutlineEdit} from 'react-icons/ai';
import {Collapse, Divider, Modal} from "react-daisyui";
import {updateRole, getRoleBySlug, getMeetingHeaders, getMeetingDetails} from "../../helpers/democracyHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";
import {meetingToName, methodName} from "../../models/roles/roleEnums";
import {updatePageEditables} from "../../helpers/staticHelper";
import InPlaceEditor from "../global/InPlaceEditor";
import meetingModel from "../../models/roles/meetingModel";
import ElectionMethodModal from "./ElectionMethodModal";
import axios from "axios";
import CandidateMaterialsModal from "./CandidateMaterialsModal";

class Elections extends React.Component {

    checkImage = async (path) => {
        try {
            const res = await axios.get(path);
            console.log(res.data.slice(0,15))
            if (res.data.slice(0,15) !== "<!DOCTYPE html>") {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err)
            return false;
        }

    }

    constructor(props) {

        super(props);
        let currentMeetingId = this.props.params["id"] === undefined? "" : this.props.params["id"];
        this.state = {  currentMeeting: undefined, currentCandidates: undefined, currentRoles: undefined,
                        currentMotions: undefined, meetingHeaders: undefined, currentMeetingId: currentMeetingId};
    }

    async componentDidMount() {
        let meetingHeaders = await getMeetingHeaders();
        console.log(meetingHeaders);
        meetingHeaders = meetingHeaders.map(meeting => new meetingModel(meeting))
        const res = await getMeetingDetails(this.state.currentMeetingId);
        console.log(res.roles)
        this.setState({currentMeeting: new meetingModel(res.meeting), currentCandidates: res.candidates, currentRoles: res.roles,
                            currentMotions: res.motions, meetingHeaders: meetingHeaders});
        console.log(res.officers)
    }

    handleChange = (event, type) => {
        this.state.role[type] = event.target.value;
    }

    handleBoolChange= (event, type) => {
        this.state.role[type] = (event.target.value === 'true');
    }

    handlePage = (page) => {
        this.state.role.page = page;
    }

    submitButton = async (event) => {
        await updateRole(this.state.role);
    }
    navigateToSlug = (slug) => {
        this.props.navigate("/elections/" + slug);

    }

    onChange = async () => {
        if (this.state.editing) {
            await updateRole(this.state.role);
        }
        this.setState({editing: !this.state.editing})
    }

    render() {
        console.log("RENDERING")
        if (this.state.meetingHeaders !== undefined) {
            const sideBar = <div className="relative w-full h-full bg-red-800 text-white p-4">
                <div className="sticky top-36 grid grid-cols-1 sm:grid-cols-2 justify-items-center md:block text-center md:text-left">
                    {this.state.meetingHeaders.map(meetingHeader => {
                        return  <div>
                                    <button className="p-1 hover:bg-red-900" onClick={() => this.navigateToSlug(meetingHeader.getSlug())}>{meetingToName(meetingHeader.m_type)} {meetingHeader.date.getFullYear()}</button>
                                </div>
                    })}
                </div>
            </div>

            return <div>
                <div className="px-4 py-6 flex bg-slate-100">
                    <div className="text-6xl font-semibold">Elections</div>
                </div>
                <div className="md:pl-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between">
                    <div className="px-4 md:pl-0 col-span-2 p-2 lg:col-span-3 mt-2 mb-8">
                        <div className="text-center grid">
                            {   this.state.currentMeeting.date.getTime() > new Date().getTime() &&
                                <div className="text-lg">Next up...</div>
                            }
                            <div className="text-4xl font-semibold">{meetingToName(this.state.currentMeeting.m_type)}</div>
                            <Divider/>
                            <div className="text-lg font-semibold">Roles up for grabs:</div>
                            <div className="md:max-w-lg w-full justify-self-center text-left border">
                                {this.state.currentRoles[0].map( (role, index) => {
                                    console.log(role);
                                    return <Collapse className={"group " + (index % 2 === 0? "bg-slate-200" : "bg-slate-100")} checkbox={true} icon="arrow">
                                        <Collapse.Title className="group-hover:bg-slate-300 text-xl font-semibold">{role.name}</Collapse.Title>
                                        <Collapse.Content className="bg-slate-50">
                                            <div><b>Description: </b><i>{role.desc}</i></div>
                                            <div><b>Election Type: </b>{role.e_type} {role.e_seats > 0 ?
                                                ("- " + role.e_seats + " seat" + (role.e_seats === 1 ? "" : "s") + " already filled.") : ""}</div>
                                            <div><b>Election Method: </b><ElectionMethodModal text={methodName(role.e_method)} method={role.e_method}/></div>
                                        </Collapse.Content>
                                    </Collapse>
                                })}
                            </div>
                            <Divider/>
                            <div className="text-lg font-semibold">Election Material:</div>
                            <div className={"grid grid-cols-1 justify-evenly place-items-center" + (this.state.currentCandidates.length > 1? (" md:grid-cols-2" + this.state.currentCandidates.length > 2? " lg:grid-cols-3" : "") : "")}>
                                {this.state.currentCandidates.map( (candidate, index) => {
                                    console.log(candidate);
                                    let rName = this.state.currentRoles[0].find(role => candidate.role = role._id);
                                    if (rName === undefined) {return}
                                    rName = rName.name;
                                    return <CandidateMaterialsModal candidate={candidate} rName={rName}></CandidateMaterialsModal>
                                })}
                            </div>
                            {this.state.currentMotions.length > 0 && <>
                                <Divider/>
                                <div className="text-lg font-semibold">Motions:</div>
                                <div className="md:max-w-lg w-full justify-self-center text-left border">
                                {this.state.currentMotions.map( (motion, index) => {
                                    return <Collapse className={"group " + (index % 2 === 0? "bg-slate-200" : "bg-slate-100")} checkbox={true} icon="arrow">
                                        <Collapse.Title className="group-hover:bg-slate-300 text-xl font-semibold">{motion.name}</Collapse.Title>
                                        <Collapse.Content className="bg-slate-50 text-left">
                                            <div className="text-lg font-semibold">This JCR Notes:</div>
                                            <div className="bangle-editor prose max-w-none">
                                                {parse(tailwindParse(motion.notes))}
                                            </div>
                                            <div className="text-lg font-semibold">This JCR Believes:</div>
                                            <div className="bangle-editor prose max-w-none">
                                                {parse(tailwindParse(motion.believes))}
                                            </div>
                                            <div className="text-lg font-semibold">This JCR Resolves:</div>
                                            <div className="bangle-editor prose max-w-none">
                                                {parse(tailwindParse(motion.resolves))}
                                            </div>
                                            <div><b>Proposed By: </b><i>{motion.proposer}</i></div>
                                            <div><b>Seconded By: </b><i>{motion.seconder}</i></div>
                                        </Collapse.Content>
                                    </Collapse>
                                })}
                                </div>
                            </>
                            }
                        </div>

                    </div>

                    <div className="w-full h-full justify-self-end block">
                        {sideBar}
                    </div>
                </div>

            </div>
        } else {
            return <Loading></Loading>
        }
    }

}


export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <Elections {...props} params={params} navigate={navigate} key={params["id"]} />;
}