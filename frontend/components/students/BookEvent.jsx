import React from "react";
import {useParams} from 'react-router-dom';
import {questionTypeEnum} from "../../models/questionTypeEnum";
import individualAnswerModel from "../../models/individualAnswerModel";
import eventBookingModel from "../../models/eventBookingModel";
import {createEventBooking, getEvents} from "../../helpers/studentHelper";
import Loading from "../global/Loading";

class BookEventComponent extends React.Component {
    constructor(props) {

        super(props);
        let eventId = this.props.params["id"].substring(1);
        this.state = {eventBooking: new eventBookingModel(), eventId: eventId, completed: false, loading:false};
        console.log(this.props.params)
        console.log(this.state.eventId);
    }

    async componentDidMount(){
        const events = await getEvents()
        console.log(this.state.eventId);
        const event = events.find(ev => ev._id === this.state.eventId)
        console.log("event is", event)
        this.setState({event: event});
    }

    //
    handleChange = (event, type, index) => {
        this.state.eventBooking.individualAnswers[index][type] = event.target.value;
        console.log(this.state.eventBooking)
    }
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
        const gs = parseInt(event.target.value);

        this.state.eventBooking.groupSize = gs;
        while (gs > this.state.eventBooking.individualAnswers.length) {
            this.state.eventBooking.individualAnswers.push(new individualAnswerModel(false, this.state.event.questions.length));
        }
        while (gs < this.state.eventBooking.individualAnswers.length) {
            this.state.eventBooking.individualAnswers.pop();
        }
        console.log(this.state.eventBooking.individualAnswers);
        this.forceUpdate()

    }

    handleQuestion = (event, index, index2) => {
        this.state.eventBooking.individualAnswers[index].questions[index2] = event.target.value;
    }

    submitEventBooking = async () => {
        this.setState({loading:true})
        await createEventBooking(this.state.eventBooking);
        this.setState({completed:true})
        this.setState({loading:false})
    }


    render() {
        if (this.state.event !== undefined && this.state.event.groupSizes !== undefined && !this.state.completed && !this.state.loading) {
            console.log("RENDERING")
            return <>
                <div className="px-4 my-2 rounded border-2 border-amber-500 flex flex-col">
                    <div className="collapse-title text-3xl font-semibold">Book: {this.state.event.name}</div>
                    <label>Number of people:</label>
                    <span className="flex">
                        {this.state.event.groupSizes["1"] &&
                        <label className="label"><input className="radio-sm hover:scale-105 transition" name="groupSize" onChange={this.handleGroupSize}
                                                        type="radio" defaultChecked={this.state.eventBooking.groupSize === 1}
                                                        value={1}/><span className="label-text ml-1">1</span></label>}
                        {this.state.event.groupSizes["2"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 2}
                                                       value={2}/><span className="label-text ml-1">2</span></label>}
                        {this.state.event.groupSizes["3"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 3}
                                                       value={3}/><span className="label-text ml-1">3</span></label>}
                        {this.state.event.groupSizes["4"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 4}
                                                       value={4}/><span className="label-text ml-1">4</span></label>}
                        {this.state.event.groupSizes["5"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 5}
                                                       value={5}/><span className="label-text ml-1">5</span></label>}
                        {this.state.event.groupSizes["6"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 6}
                                                       value={6}/><span className="label-text ml-1">6</span></label>}
                        {this.state.event.groupSizes["8"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 8}
                                                       value={8}/><span className="label-text ml-1">8</span></label>}
                        {this.state.event.groupSizes["10"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 10}
                                                       value={10}/><span className="label-text ml-1">10</span></label>}
                        {this.state.event.groupSizes["12"] &&
                        <label className="ml-2 label"><input name="groupSize" onChange={this.handleGroupSize}
                                                       type="radio" className="radio-sm hover:scale-105 transition"
                                                       defaultChecked={this.state.eventBooking.groupSize === 12}
                                                       value={12}/><span className="label-text ml-1">12</span></label>}
                    </span>

                        {this.state.eventBooking.individualAnswers.map((individualAnswer, index) =>{
                                return <div key={index} className="flex flex-col">
                                    <div className="font-bold">Person {index + 1}</div>
                                        <label> Person Name:
                                            <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                                name="name" type="text" defaultValue={individualAnswer.name} onChange={(event) => this.handleChange(event, "name", index)}/>
                                        </label>
                                        <label> CIS Code <i>(use personal email if guest):</i>
                                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                               name="name" type="text" defaultValue={individualAnswer.cis} onChange={(event) => this.handleChange(event, "cis", index)}/>
                                        </label>
                                    {this.state.event.questions.map((question, index2) =>{
                                        return <div key={index2} className="flex flex-col">
                                            <div>{question.questionText}</div>
                                            {(question.questionType === questionTypeEnum.multipleChoice) && <div>
                                                {question.data.map((option, index3) =>{
                                                    return <div key={index3} className="">
                                                        <label><input name={"mt_" + index2 + "_" + index} onChange={(event => this.handleQuestion(event, index, index2))}
                                                                      type="radio"
                                                                      defaultChecked={this.state.eventBooking.groupSize === 1}
                                                                      value={index3}/>{option}</label>

                                                    </div>})}

                                                </div>}
                                                {(question.questionType === questionTypeEnum.number) && <div>
                                                    <textarea className="w-96 textarea mb-2 rounded border-2 border-slate-500" placeholder="" onChange={(event => this.handleQuestion(event, index, index2))}/>
                                                </div>}
                                            {(question.questionType === questionTypeEnum.text) && <div>
                                                <label>
                                                    <input className="mb-2 rounded border-2 border-slate-500" name="noTickets"
                                                           type="number" onChange={(event => this.handleQuestion(event, index, index2))}
                                                           onKeyPress={(event) => {
                                                               if (!/[0-9]/.test(event.key)) {
                                                                   event.preventDefault();
                                                               }
                                                           }}
                                                    /></label>
                                            </div>}

                                    </div>})}

                                </div>})}

                    {/*    <button className="bg-amber-300 rounded p-1 transition hover:bg-amber-600" onClick={this.addQuestion}>Add Question</button>*/}


                </div>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitEventBooking}>Submit Booking</button>
            </>
        }
        else if (this.state.completed) {
            return <div>
                Your booking is confirmed
            </div>
        }
        else {
            return <Loading></Loading>
        }

    }

}

const BookEvent = (props) => {
    const params = useParams();

    return <BookEventComponent {...props} params={params} />;
}

export default BookEvent