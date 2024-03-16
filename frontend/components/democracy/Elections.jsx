import React from "react";
import {Collapse, Divider} from "react-daisyui";
import {getMeetingDetails, getMeetingHeaders, updateRole} from "../../helpers/democracyHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";
import {meetingToName, methodName} from "../../models/roles/roleEnums";
import meetingModel from "../../models/roles/meetingModel";
import ElectionMethodModal from "./ElectionMethodModal";
import axios from "axios";
import CandidateMaterialsModal from "./CandidateMaterialsModal";

class ElectionsComponent extends React.Component {

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

    submitButton = async () => {
        await updateRole(this.state.role);
    }
    navigateToSlug = (slug) => {
        this.props.navigate("/elections/" + slug);

    }

    goToRolePage = (slug) => {
        this.props.navigate("/roles/" + slug);
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
                    {this.state.meetingHeaders.map((meetingHeader, index) => {
                        return  <div key={index}>
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
                            <div className="text-left mt-8 bangle-editor prose max-w-none">
                                {parse(tailwindParse(this.state.currentMeeting.page))}
                            </div>
                            <Divider/>
                            {this.state.currentRoles.length > 0 && this.state.currentRoles[0].slug !== undefined && <>
                                <div className="text-lg font-semibold">Roles up for grabs:</div>
                                    <div className="md:max-w-lg w-full justify-self-center text-left border">
                                    {this.state.currentRoles.map( (role, index) => {
                                        console.log(role);
                                        return <Collapse key={role._id} className={"group " + (index % 2 === 0? "bg-slate-200" : "bg-slate-100")} checkbox={true} icon="arrow">
                                            <Collapse.Title className="group-hover:bg-slate-300 text-xl font-semibold">{role.name}</Collapse.Title>
                                            <Collapse.Content className="bg-slate-50">
                                                <div><b>Description: </b><i>{role.desc}</i></div>
                                                <div><b>Election Type: </b>{role.e_type} {role.e_seats > 0 ?
                                                    ("- " + role.e_seats + " seat" + (role.e_seats === 1 ? "" : "s") + " already filled.") : ""}</div>
                                                <div><b>Election Method: </b><ElectionMethodModal text={methodName(role.e_method)} method={role.e_method}/></div>
                                                <Divider className="my-0"/>
                                                <button className="text-blue-700" onClick={() => this.goToRolePage(role.slug)}>{role.name} Webpage!</button>
                                            </Collapse.Content>
                                        </Collapse>
                                    })}
                                </div>
                            </>}
                            {this.state.currentRoles.length > 0 && this.state.currentRoles[0].slug === undefined && <>
                            <div className="text-lg font-semibold">Elected Officers:</div>
                                <div className="md:max-w-lg w-full justify-self-center text-left border">
                                {this.state.currentRoles.map( (officer, index) => {
                                    return <Collapse key={officer._id} className={"group " + (index % 2 === 0? "bg-slate-200" : "bg-slate-100")} checkbox={true} icon="arrow">
                                        <Collapse.Title className="group-hover:bg-slate-300 text-xl font-semibold">{officer.name}: {officer.role.name}</Collapse.Title>
                                        <Collapse.Content className="bg-slate-50">
                                            <div><b>Description: </b><i>{officer.role.desc}</i></div>
                                            <div><b>Election Method: </b><ElectionMethodModal text={methodName(officer.role.e_method)} text_props="text-blue-700 hover:underline" method={officer.role.e_method}/></div>
                                            <Divider className="my-0"/>
                                            <button className="text-blue-700 hover:underline" onClick={() => this.goToRolePage(officer.role.slug)}>{officer.role.name} Webpage!</button>
                                        </Collapse.Content>
                                    </Collapse>
                                })}
                                </div>
                            </>}
                            { this.state.currentCandidates.length > 0 && <>
                                <Divider/>
                                <div className="text-lg font-semibold">Election Material:</div>
                                <div className={"grid grid-cols-1 justify-evenly place-items-center" + (this.state.currentCandidates.length > 1? (" md:grid-cols-2" + this.state.currentCandidates.length > 2? " lg:grid-cols-3" : "") : "")}>
                                    {this.state.currentCandidates.map( (candidate) => {
                                        console.log(candidate);
                                        let rName = candidate.role.name;
                                        return <CandidateMaterialsModal key={candidate._id} candidate={candidate} rName={rName}></CandidateMaterialsModal>
                                    })}
                                </div>
                            </>}

                            {this.state.currentMotions.length > 0 && <>
                                <Divider/>
                                <div className="text-lg font-semibold">Motions:</div>
                                <div className="md:max-w-lg w-full justify-self-center text-left border">
                                {this.state.currentMotions.map( (motion, index) => {
                                    return <Collapse key={motion._id} className={"group " + (index % 2 === 0? "bg-slate-200" : "bg-slate-100")} checkbox={true} icon="arrow">
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


const Elections = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <ElectionsComponent {...props} params={params} navigate={navigate} key={params["id"]} />;
}

export default Elections