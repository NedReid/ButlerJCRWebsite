import React from "react";
import {createCalendarEvent, updateCalendarEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import CreateEditQuestion from './CreateEditQuestion';
import questionModel from "../../models/questionModel";
import {calendarEventModel} from "../../models/calendarEventModel";
import {calendarEventEnum, getCalendarEventTypeName} from "../../models/calendarEventEnum";
import {meetingEnum, meetingToName} from "../../models/roles/roleEnums";
import {Checkbox} from "react-daisyui";

class CreateEditCalendarEvent extends React.Component {
    constructor(props) {

        super(props);
        this.state = {event: new calendarEventModel()};
        if (props.event !== undefined) {
            console.log("notnull")
            this.state = {event: props.event}
            console.log(this.state.event);
        }
    }

    handleChange = (event, type) => {
        this.state.event[type] = event.target.value;
        console.log(this.state.event)
    }
    handleNumChange= (event, type) => {
        this.state.event[type] = parseInt(event.target.value);
        console.log(this.state.event)
    }
    handleBoolChange= (event, type) => {
        this.state.event[type] = (event.target.checked);
        this.forceUpdate()
        console.log(this.state.event)
    }
    handleDateStartChange = (event) => {
        if (this.state.event.allDay && event !== null) {
            event.setHours(0, 0,0)
        }
        this.state.event.startDate = event;
    }
    handleDateEndChange = (event) => {
        if (this.state.event.allDay && event !== null) {
            event.setHours(0, 0,0)
            event.setDate(event.getDate() + 1)
        }
        console.log(event)
        this.state.event.endDate = event;
    }

    handleDesc = (desc) => {
        this.state.event.description = desc;
    }

    handleGroupSize = (event) => {
        this.state.event.groupSizes[event.target.value] = !this.state.event.groupSizes[event.target.value];
    }

    addQuestion = (event) => {
        console.log("adding q")
        this.state.event.questions.push(new questionModel());
        let maxId = Math.max(...this.state.event.questions.map(r => r.id));
        this.state.event.questions[this.state.event.questions.length - 1].id = maxId + 1;
        // this.setState({event: new eventModel(this.state.event)});
        this.forceUpdate()
    }

    removeQuestion = (id, event) => {
        console.log("removing q")
        this.state.event.questions.splice(id, 1);
        // this.setState({event: new eventModel(this.state.event)});
        this.forceUpdate()

    }

    submitButton = async (event) => {
        if (this.props.event !== undefined) {
            await updateCalendarEvent(this.state.event);
        }
        else {
            await createCalendarEvent(this.state.event);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }


    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 border-gray-500 border-l-2 flex flex-col">

            <label> Event title:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="title" type="text" defaultValue={this.state.event.title} onChange={(event) => this.handleChange(event, "title")}/>
            </label>

            <label> Event Category:</label>
            <select name="category" defaultValue={this.state.event.category} onChange={(event) => this.handleNumChange(event, "category")} className="select select-bordered w-full max-w-xs mb-2">
                {[...Array(7)].map((x, i) => {
                    return <option value={i} key="category">{getCalendarEventTypeName(i)}</option>
                })}
            </select>

            <label className="flex items-center"> All Day?
            <Checkbox className="ml-2" defaultChecked={this.state.event.allDay} onChange={(event) => this.handleBoolChange(event, "allDay")}></Checkbox>
            </label>

            {this.state.event.allDay && <>
                <label> Event Start Date:
                    <DateTimePicker disableCalendar={true} disableClock={true} className="ml-2 mb-2" format="dd/MM/y"
                                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                                    name="startDate" value={this.state.event.startDate} onChange={this.handleDateStartChange}
                    />
                </label>
                <label> Event End Date:
                    <DateTimePicker disableCalendar={true} disableClock={true} className="ml-2 mb-2" format="dd/MM/y"
                                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                                    name="endDate" value={this.state.event.endDate} onChange={this.handleDateEndChange}
                    />
                </label>
            </>}

            {!this.state.event.allDay && <>
                <label> Event Start Date and Time:
                    <DateTimePicker disableCalendar={true} disableClock={true} className="ml-2 mb-2"
                                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                                    name="startDate" value={this.state.event.startDate} onChange={this.handleDateStartChange}
                    />
                </label>
                <label> Event End Date and Time:
                    <DateTimePicker disableCalendar={true} disableClock={true} className="ml-2 mb-2"
                                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                                    name="endDate" value={this.state.event.endDate} onChange={this.handleDateEndChange}
                    />
                </label>
            </>}

            <label> Short Description:
                <br/>
                <input className="rounded border-2 border-slate-500 w-full max-w-2xl" maxLength="64"
                       name="shortDescription" type="text" defaultValue={this.state.event.shortDescription} onChange={(event) => this.handleChange(event, "shortDescription")}/>
            </label>
            <div className="text-sm italic mb-2">Max 64 Characters - Short description of event</div>

            <label> Event Description:</label>
            <div className="p-1 rounded border-2 border-slate-500 mb-2">
                <TextEditor initialValue={this.state.event.description} onUpdate={this.handleDesc} />

            </div>

            <label> Location of event:
                <br/>
                <input className="rounded border-2 border-slate-500 w-full max-w-2xl" maxLength="128"
                       name="location" type="text" defaultValue={this.state.event.location} onChange={(event) => this.handleChange(event, "location")}/>
            </label>
            <div className="text-sm italic mb-2">Write "TBC" or leave blank if unknown</div>

            <label> Link to event:
                <br/>
                <input className="rounded border-2 border-slate-500 w-full max-w-2xl"
                       name="link" type="text" defaultValue={this.state.event.link} onChange={(event) => this.handleChange(event, "link")}/>
            </label>
            <div className="text-sm italic mb-2">Optional: Link to booking or more information.</div>

            <label className="flex items-center"> Visible?
                <Checkbox className="ml-2" defaultChecked={this.state.event.visible} onChange={(event) => this.handleBoolChange(event, "visible")}></Checkbox>
            </label>


        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Event</button>
        </>
    }

}

export default CreateEditCalendarEvent;