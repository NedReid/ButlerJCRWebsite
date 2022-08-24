import React from "react";
import {createEvent, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import roleModel from "../../models/roles/roleModel";
import {AiFillEdit, AiOutlineSave, AiOutlineEdit} from 'react-icons/ai';
import {Collapse, Divider} from "react-daisyui";
import {updateRole, getRoleBySlug, getMeetingHeaders, getMeetingDetails} from "../../helpers/democracyHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";
import {meetingToName, methodName} from "../../models/roles/roleEnums";
import {updatePageEditables} from "../../helpers/staticHelper";
import InPlaceEditor from "../global/InPlaceEditor";
import meetingModel from "../../models/roles/meetingModel";

class Elections extends React.Component {
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
                <div className="sticky top-36 grid grid-cols-2 justify-items-center md:block text-center md:text-left">
                    {this.state.meetingHeaders.map(meetingHeader => {
                        return  <div>
                                    <button onClick={() => this.navigateToSlug(meetingHeader.getSlug())}>{meetingToName(meetingHeader.m_type)} {meetingHeader.date.getFullYear()}</button>
                                </div>
                    })}
                </div>
            </div>

            return <div>
                <div className="px-4 py-6 flex bg-slate-100">
                    <div className="text-6xl font-semibold">Elections</div>
                </div>
                <div className="md:pl-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between">
                    <div className="w-full h-full justify-self-end md:hidden">
                        {sideBar}
                    </div>
                    <div className="pl-4 md:pl-0 col-span-2 p-2 lg:col-span-3 mt-2">
                        <div className="text-center">
                            {   this.state.currentMeeting.date.getTime() > new Date().getTime() &&
                                <div className="text-lg">Next up...</div>
                            }
                            <div className="text-4xl font-semibold">{meetingToName(this.state.currentMeeting.m_type)}</div>
                            <Divider/>
                            <div className="text-lg font-semibold">Roles up for grabs:</div>
                            {this.state.currentRoles[0].map( role => {
                                console.log(role);
                                return <Collapse className="group" checkbox={true} icon="arrow">
                                    <Collapse.Title className="group-hover:bg-slate-100 text-xl font-semibold">{role.name}</Collapse.Title>
                                    <Collapse.Content className="group-hover:bg-slate-50">
                                        <div>{role.desc}</div>
                                        <div>{role.e_type} {role.e_seats > 0 ?
                                            ("- " + role.e_seats + "seat" + (role.e_seats === 1 ? "" : "s") + " already filled.") : ""}</div>
                                    </Collapse.Content>
                                </Collapse>
                            })}

                        </div>

                    </div>

                    <div className="w-full h-full justify-self-end hidden md:block">
                        {sideBar}
                    </div>
                </div>

            </div>
        } else {
            return <Loading></Loading>
        }
        if (this.state.role !== undefined) {
            const sideBar = <div className="relative w-full h-full bg-red-800 text-white p-4">
                <div className="sticky top-36 grid grid-cols-2 justify-items-center md:block text-center md:text-left">
                    <div>
                        <p><i>Election Type:</i></p>
                        <p className="font-semibold">{this.state.role.e_type}</p>
                        <br/>
                    </div>
                    <div>
                        <p><i>Next Election:</i></p>
                        <p className="font-semibold">{meetingToName(this.state.role.e_meeting)}</p>
                        <br/>
                    </div>
                    <div>
                        <p><i>Election Method:</i></p>
                        <p className="font-semibold">{methodName(this.state.role.e_method)}</p>
                        <br/>
                    </div>
                    {this.state.officers.length > 0?
                        this.state.officers.map((officer) =>
                            <div>
                                <p><i>Contact Current Officer:</i></p>
                                <p className="font-semibold">{officer.name}</p>
                                <p className="font-semibold">{officer.username}@durham.ac.uk</p>
                                <br/>
                            </div>)
                        :
                        <div>
                            <p><i>Role status:</i></p>
                            <p className="font-semibold">Role is currently vacant</p>
                        </div>
                    }

                </div>



            </div>

            return <div className="">
                {this.state.admin && <div className="bg-slate-500 text-white w-full h-12 pl-2 flex">
                    <div className="w-full h-12 flex flex-grow items-center">You are an editor.</div>
                    <button className={"flex-grow-0 flex-shrink-0 w-12 h-12 bg-slate-600 px-1 ml-1 transition hover:bg-slate-700 swap " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                        <AiOutlineSave className="swap-on text-white text-2xl"></AiOutlineSave>
                        <AiOutlineEdit className="swap-off text-white text-2xl"></AiOutlineEdit>
                    </button>
                </div>}
                {this.state.editing && <div className="bg-slate-600 text-white w-full h-24 p-4">
                    <label> Role Description:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500 text-black"
                               name="name" type="text" defaultValue={this.state.role.desc}
                               onChange={(event) => this.handleChange(event, "desc")}/>
                    </label>
                    <br/>
                    <label className="mr-4"> Visible:</label>
                    <span>
                        <label><input defaultChecked={this.state.role.visible === false}
                                      onChange={(event) => this.handleBoolChange(event, "visible")} type="radio"
                                      name={this.state.role._id + "visible"} value={false}/>
                        False</label>
                        <label className="ml-2"><input defaultChecked={this.state.role.visible === true}
                                                       onChange={(event) => this.handleBoolChange(event, "visible")}
                                                       type="radio" name={this.state.role._id + "visible"} value={true}/>
                        True</label>
                    </span>
                </div>}
                <div className="px-4 py-6 flex bg-slate-100">
                    <div className="text-6xl font-semibold">{this.state.role.name}</div>
                </div>
                <div className="md:pl-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between">
                    <div className="w-full h-full justify-self-end md:hidden">
                        {sideBar}
                    </div>
                    <div className="pl-4 md:pl-0 col-span-2 p-2 lg:col-span-3 mt-2">
                        {this.state.editing?
                            <div className="border-2 rounded">
                                <InPlaceEditor className="w-full h-full max-w-none" initialValue={this.state.role.page} onUpdate={this.handlePage}/>
                            </div>
                        :
                            <div className="bangle-editor prose max-w-none">
                                {parse(tailwindParse(this.state.role.page))}
                            </div>
                        }
                        <Divider/>
                        <Collapse className="group" checkbox={true} icon="arrow">
                            <Collapse.Title className="group-hover:bg-slate-100 text-3xl font-semibold">Standing Orders</Collapse.Title>
                            <Collapse.Content className="group-hover:bg-slate-50 bangle-editor prose max-w-none">
                                    {parse(tailwindParse(this.state.role.so))}
                            </Collapse.Content>
                        </Collapse>
                    </div>

                    <div className="w-full h-full justify-self-end hidden md:block">
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