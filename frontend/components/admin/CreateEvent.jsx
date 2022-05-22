import React from "react";
import {createEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';

class Events extends React.Component {
    constructor(props) {

        super(props);
        this.state = {event: new eventModel()};



    }

    handleChange = (event) => {
        this.state.event[event.target.name] = event.target.value;
        console.log(this.state.event)
    }
    handleNumChange= (event) => {
        this.state.event[event.target.name] = parseInt(event.target.value);
        console.log(this.state.event)
    }
    handleDateStartChange = (event) => {
        this.state.event.ticketReleaseDate = event;
    }
    handleDateEndChange = (event) => {
        this.state.event.ticketReleaseDeadline = event;
    }

    handleDesc = (desc) => {
        this.state.event.desc = desc;
    }

    handleGroupSize = (event) => {
        this.state.event.groupSizes[event.target.value] = !this.state.event.groupSizes[event.target.value];
    }
    submitButton = async (event) => {
        await createEvent(this.state.event);
        this.props.closeTab();
    }


    render() {
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label> Event Name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.event.name} onChange={this.handleChange}/>
            </label>

            <label> Event Ticket Release Date:
                <DateTimePicker disableCalendar="true" disableClock="true" className="ml-2 mb-2"
                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                    name="ticketReleaseDate" value={this.state.event.ticketReleaseDate} onChange={this.handleDateStartChange}
                />
            </label>

            <label> Event Ticket Release Deadline:
                <DateTimePicker disableCalendar="true" disableClock="true" className="ml-2 mb-2"
                    minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                    name="ticketReleaseDeadline" value={this.state.event.ticketReleaseDeadline} onChange={this.handleDateEndChange}
                />
            </label>

            <label> Ticket Selection Mode:</label>
            <span>
                <label><input defaultChecked={this.state.event.selectionMode === selectionModeEnum.firstComeFirstServe}  onChange={this.handleChange} type="radio" id="ts1" name="selectionMode" value={selectionModeEnum.firstComeFirstServe}/>
                First Come First Serve</label>
                <label className="ml-2"><input defaultChecked={this.state.event.selectionMode === selectionModeEnum.random} onChange={this.handleChange} type="radio" id="ts2" name="selectionMode" value={selectionModeEnum.random}/>
                Random</label>
            </span>

            <label> Number of tickets:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noTickets"
                       type="number" defaultValue={this.state.event.noTickets} onChange={this.handleNumChange}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                /></label>


            <label> Visible:</label>
            <span>
                <label><input defaultChecked={this.state.event.visible === false}  onChange={this.handleChange} type="radio" name="visible" value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.event.visible === true} onChange={this.handleChange} type="radio" name="visible" value={true}/>
                True</label>
            </span>

            <label> Allowed Group Sizes:</label>
            <span>
                <label><input                   defaultChecked={this.state.event.groupSizes["1"]}  onChange={this.handleGroupSize}
                              type="checkbox" name="groupSizes" value={1}/>1</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["2"]}  onChange={this.handleGroupSize}
                              type="checkbox" name="groupSizes" value={2}/>2</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["3"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={3}/>3</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["4"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={4}/>4</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["5"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={5}/>5</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["6"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={6}/>6</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["8"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={8}/>8</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["10"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={10}/>10</label>
                <label className="ml-2"><input defaultChecked={this.state.event.groupSizes["12"]}  onChange={this.handleGroupSize}
                               type="checkbox" name="groupSizes" value={12}/>12</label>



            </span>

            <label> Event Description:</label>
            <div className="p-1 rounded border-2 border-slate-500">
                <TextEditor initialValue={this.state.event.desc} onUpdate={this.handleDesc} />
            </div>
        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Event</button>
        </>
    }

}

export default Events;