import React from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {createEvent, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import individualAnswerModel from "../../models/individualAnswerModel";
import eventBookingModel from "../../models/eventBookingModel";
import {getEvents} from "../../helpers/studentHelper";
import Loading from "../global/Loading";

class BookEvent extends React.Component {
    constructor(props) {

        super(props);
        let eventId = this.props.params["id"].substring(1);
        this.state = {eventBooking: new eventBookingModel(), eventId: eventId};
        console.log(this.props.params)
        console.log(this.state.eventId);
        // console.log(this.state.event.name)
    }

    async componentDidMount(){
        const events = await getEvents()
        console.log(this.state.eventId);
        const event = events.find(ev => ev._id === this.state.eventId)
        console.log("event is", event)
        this.setState({event: event});
    }

    //
    // handleChange = (event, type) => {
    //     this.state.event[type] = event.target.value;
    //     console.log(this.state.event)
    // }
    // handleNumChange= (event, type) => {
    //     this.state.event[type] = parseInt(event.target.value);
    //     console.log(this.state.event)
    // }
    // handleBoolChange= (event, type) => {
    //     this.state.event[type] = (event.target.value === 'true');
    //     console.log(this.state.event)
    // }
    // handleDateStartChange = (event) => {
    //     this.state.event.ticketReleaseDate = event;
    // }
    // handleDateEndChange = (event) => {
    //     this.state.event.ticketReleaseDeadline = event;
    // }
    //
    // handleDesc = (desc) => {
    //     this.state.event.desc = desc;
    // }
    //
    handleGroupSize = (event) => {
        this.state.eventBooking.groupSize = event.target.value;
    }
    //
    // addQuestion = (event) => {
    //     console.log("adding q")
    //     this.state.event.questions.push(new questionModel());
    //     let maxId = Math.max(...this.state.event.questions.map(r => r.id));
    //     this.state.event.questions[this.state.event.questions.length - 1].id = maxId + 1;
    //     // this.setState({event: new eventModel(this.state.event)});
    //     this.forceUpdate()
    // }
    //
    // removeQuestion = (id, event) => {
    //     console.log("removing q")
    //     this.state.event.questions.splice(id, 1);
    //     // this.setState({event: new eventModel(this.state.event)});
    //     this.forceUpdate()
    //
    // }
    //
    // submitButton = async (event) => {
    //     if (this.state.event !== undefined) {
    //         await updateEvent(this.state.event);
    //     }
    //     else {
    //         await createEvent(this.state.event);
    //     }
    //     console.log(this.props.closeTab);
    //     this.props.closeTab();
    //     console.log("closedTab")
    // }


    render() {
        if (this.state.event !== undefined && this.state.event.groupSizes !== undefined) {
            console.log("RENDERING")
            return <>
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <label>Number of people:</label>
                    <span>
                    {this.state.event.groupSizes["1"] && <label><input name="groupSize" onChange={this.handleGroupSize}
                                                                       type="radio"
                                                                       defaultChecked={this.state.eventBooking.groupSize === 1}
                                                                       value={1}/>1</label>}
                        {this.state.event.groupSizes["2"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 2}
                                                       value={2}/>2</label>}
                        {this.state.event.groupSizes["3"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 3}
                                                       value={3}/>3</label>}
                        {this.state.event.groupSizes["4"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 4}
                                                       value={4}/>4</label>}
                        {this.state.event.groupSizes["5"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 5}
                                                       value={5}/>5</label>}
                        {this.state.event.groupSizes["6"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 6}
                                                       value={6}/>7</label>}
                        {this.state.event.groupSizes["8"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 8}
                                                       value={8}/>8</label>}
                        {this.state.event.groupSizes["10"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 10}
                                                       value={10}/>10</label>}
                        {this.state.event.groupSizes["12"] &&
                        <label className="ml-2"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio"
                                                       defaultChecked={this.state.eventBooking.groupSize === 12}
                                                       value={12}/>12</label>}
                </span>

                    Well, while you're here! Hope you like BEANS
                    {/*    <label> Event Name:*/}
                    {/*        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"*/}
                    {/*            name="name" type="text" defaultValue={this.state.event.name} onChange={(event) => this.handleChange(event, "name")}/>*/}
                    {/*    </label>*/}

                    {/*    <label> Event Ticket Release Date:*/}
                    {/*        <DateTimePicker disableCalendar="true" disableClock="true" className="ml-2 mb-2"*/}
                    {/*            minDate={new Date(2000,1)} maxDate={new Date(3000,1)}*/}
                    {/*            name="ticketReleaseDate" value={this.state.event.ticketReleaseDate} onChange={this.handleDateStartChange}*/}
                    {/*        />*/}
                    {/*    </label>*/}

                    {/*    <label> Event Ticket Release Deadline:*/}
                    {/*        <DateTimePicker disableCalendar="true" disableClock="true" className="ml-2 mb-2"*/}
                    {/*            minDate={new Date(2000,1)} maxDate={new Date(3000,1)}*/}
                    {/*            name="ticketReleaseDeadline" value={this.state.event.ticketReleaseDeadline} onChange={this.handleDateEndChange}*/}
                    {/*        />*/}
                    {/*    </label>*/}

                    {/*    <label> Ticket Selection Mode:</label>*/}
                    {/*    <span>*/}
                    {/*        <label><input defaultChecked={this.state.event.selectionMode === selectionModeEnum.firstComeFirstServe}  onChange={(event) => this.handleNumChange(event, "selectionMode")} type="radio" id="ts1" name={this.state.event._id + "selectionMode"} value={selectionModeEnum.firstComeFirstServe}/>*/}
                    {/*        First Come First Serve</label>*/}
                    {/*        <label className="ml-2"><input defaultChecked={this.state.event.selectionMode === selectionModeEnum.random} onChange={(event) => this.handleNumChange(event, "selectionMode")} type="radio" id="ts2" name={this.state.event._id + "selectionMode"} value={selectionModeEnum.random}/>*/}
                    {/*        Random</label>*/}
                    {/*    </span>*/}

                    {/*    <label> Number of tickets:*/}
                    {/*        <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noTickets"*/}
                    {/*               type="number" defaultValue={this.state.event.noTickets} onChange={(event) => this.handleNumChange(event, "noTickets")}*/}
                    {/*            onKeyPress={(event) => {*/}
                    {/*                if (!/[0-9]/.test(event.key)) {*/}
                    {/*                    event.preventDefault();*/}
                    {/*                }*/}
                    {/*            }}*/}
                    {/*        /></label>*/}


                    {/*    <label> Visible:</label>*/}
                    {/*    <span>*/}
                    {/*        <label><input defaultChecked={this.state.event.visible === false}  onChange={(event) => this.handleBoolChange(event, "visible")} type="radio" name={this.state.event._id + "visible"} value={false}/>*/}
                    {/*        False</label>*/}
                    {/*        <label className="ml-2"><input defaultChecked={this.state.event.visible === true} onChange={(event) => this.handleBoolChange(event, "visible")} type="radio" name={this.state.event._id + "visible"} value={true}/>*/}
                    {/*        True</label>*/}
                    {/*    </span>*/}


                    {/*    <label> Event Description:</label>*/}
                    {/*    <div className="p-1 rounded border-2 border-slate-500">*/}
                    {/*        <TextEditor initialValue={this.state.event.desc} onUpdate={this.handleDesc} />*/}
                    {/*    </div>*/}

                    {/*    {this.state.event.questions.map((question, index) =>{*/}
                    {/*            return <div>*/}
                    {/*                <CreateEditQuestion key={question.id} qu={question} _id={this.state.event._id}/>*/}
                    {/*                <button className="bg-amber-300 rounded p-1 transition hover:bg-amber-600" onClick={(event) => this.removeQuestion(index, event)}>Remove Question</button>*/}
                    {/*            </div>*/}
                    {/*    })}*/}
                    {/*    <div>*/}
                    {/*        fdfs*/}
                    {/*    </div>*/}

                    {/*    <button className="bg-amber-300 rounded p-1 transition hover:bg-amber-600" onClick={this.addQuestion}>Add Question</button>*/}


                </div>
                {/*<button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Event</button>*/}
            </>
        }
        else {
            return <Loading></Loading>
        }

    }

}

export default function(props) {
    const params = useParams();

    return <BookEvent {...props} params={params} />;
}