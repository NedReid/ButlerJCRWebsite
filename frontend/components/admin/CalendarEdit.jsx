import React from "react";
import {createEvent, getCalendarEvents, getEvents, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import SSCModel from "../../models/SSCModel";
import { getPost } from "../../helpers/staticHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";
import {getUserByResetToken, submitNewPassword} from "../../helpers/loginHelper";
import CreateEditCalendarEvent from "./CreateEditCalendarEvent";
import {meetingToName} from "../../models/roles/roleEnums";
import CreateEditCandidate from "./CreateEditCandidate";
import {monthName} from "../../models/calendarEventEnum";

class CalendarEdit extends React.Component {
    constructor(props) {

        super(props);
        if (props.admin.events === false) {
            this.props.navigate("/oh-no", {replace: true});
        }

        this.state = {addingEvent: false, events: undefined, currentEvent: undefined, targetYear: new Date().getFullYear(), targetMonth: new Date().getMonth()};
    }

    async componentDidMount() {
        const events = await getCalendarEvents()
        console.log(events)
        this.setState({events: events});
    }

    handleChange = (event, type) => {
        this.state.post[type] = event.target.value;
        console.log(this.state.post)
    }

    handleBoolChange= (event, type) => {
        this.state.post[type] = (event.target.value === 'true');
        console.log(this.state.post)
    }

    onUpdated = async () => {
        this.currentEvent = undefined;
        this.setState({events: []})
        const events = await getCalendarEvents()
        this.setState({events: events});
    }

    onCreated = async () => {
        this.setState({addingEvent: false});
        this.setState({events: []})
        const events = await getCalendarEvents()
        this.setState({events: events});
    }

    handlePage = (page) => {
        this.state.post.page = page;
    }

    changeTargetYear = async (event) => {
        this.setState({currentEvent: undefined})
        await this.setState({targetYear: parseInt(event.target.value)});
        this.forceUpdate()
    }

    changeTargetMonth = async (event) => {
        this.setState({currentEvent: undefined})
        await this.setState({targetMonth: parseInt(event.target.value)});
        this.forceUpdate()
    }

    editEvent = (event) => {
        const currentEvent = this.state.events.find(cEvent => {
            return cEvent._id === event.target.value;
        });
        console.log(currentEvent)
        this.setState({currentEvent: currentEvent});
    }


    render() {
        console.log("RENDERING", this.state.post)
        if (this.state.events !== undefined) {
            return <div className="p-4">

                <div className="text-2xl font-semibold mb-4"> Manage Calendar</div>

                {this.state.addingEvent === false &&
                    <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: true})}}>Create Calendar Event</button>
                }
                {this.state.addingEvent === true && <>
                    <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: false})}}>Cancel</button>
                    <CreateEditCalendarEvent closeTab={this.onCreated}/>
                </>}

                <br/>

                Edit Current Candidate:
                <br/>
                <label> Year:
                    <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="election_year"
                           type="number" defaultValue={new Date().getFullYear()} onChange={this.changeTargetYear}
                           onKeyPress={(event) => {
                               if (!/[0-9]/.test(event.key)) {
                                   event.preventDefault();
                               }
                           }}
                    /></label>
                <br/>
                Month:
                <select defaultValue={this.state.targetMonth} onChange={this.changeTargetMonth} className="ml-2 select select-bordered w-full max-w-xs">
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map((month, index) => {
                        return (
                            <option value={month} key={month}>{monthName(month) + " " + this.state.targetYear}</option>
                        );})}
                </select>
            <br/>
        <select defaultValue="" onChange={this.editEvent} key={this.editEvent} className="select select-bordered w-full max-w-xs">
                <option value="">Select Event</option>
                {this.state.events.filter((event) => {
                    const start = new Date(this.state.targetYear, (this.state.targetMonth)).valueOf()
                    const end = new Date(this.state.targetYear + (this.state.targetMonth === 11? 1 : 0), (this.state.targetMonth + 1 % 12)).valueOf()
                    const current = new Date(event.startDate).valueOf()
                    console.log(this.state.targetYear, this.state.targetMonth)
                    console.log(start, current, end)
                    console.log(current >= start && current < end)
                    return (current >= start && current < end)
                    }).map((event, index) => {
                    return (
                        <option value={event._id} key={event._id}>{event.title}</option>

                    );
                })}
            </select>
            <br/>
        {this.state.currentEvent !== undefined && this.state.events.map((event, index) =>{
                if(event === this.state.currentEvent) {
                    return <CreateEditCalendarEvent closeTab={this.onUpdated} key={event._id} event={this.state.currentEvent}/>
                }
            })}
        {/*</div>*/}
            </div>
        } else {
            return <Loading></Loading>
        }
    }

}


export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <CalendarEdit {...props} params={params} navigate={navigate} />;
}