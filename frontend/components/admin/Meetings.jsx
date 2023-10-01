import React from 'react';
import {getMeetings} from '../../helpers/adminHelper';
import CreateEditMeeting from './CreateEditMeeting';
import {meetingToName, methodEnum} from "../../models/roles/roleEnums";

class Meetings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingMeeting: false, meetings: [], currentMeeting: undefined, typeSelect:(new Date()).getFullYear()};
        this.meetingSelect = React.createRef()
    }

    async componentDidMount(){
        const meetings = await getMeetings()
        this.setState({meetings: meetings});
        console.log(meetings)
    }

    editMeeting = (event) => {
        const currentMeeting = this.state.meetings.find(meeting => {
            return meeting._id === event.target.value;
        });
        console.log(currentMeeting)
        this.setState({currentMeeting: currentMeeting});
    }

    onUpdated = async () => {
        this.currentMeeting = undefined;
        this.setState({meetings: []})
        const meetings = await getMeetings()
        this.setState({meetings: meetings});
    }

    onCreated = async () => {
        this.setState({addingMeeting: false});
        this.setState({meetings: []})
        const meetings = await getMeetings()
        this.setState({meetings: meetings});
    }

    changeTargetType = async (event) => {
        this.setState({currentMeeting: undefined})
        await this.setState({typeSelect: parseInt(event.target.value)});
        this.forceUpdate()
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingMeeting === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingMeeting: true})}}>Create Meeting</button>
            }
            {this.state.addingMeeting === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingMeeting: false})}}>Cancel</button>
                <CreateEditMeeting closeTab={this.onCreated}/>
            </>}
            <br/>
            Edit Current Meeting:
            <br/>
            <label> Year:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="election_year"
                       type="number" defaultValue={new Date().getFullYear()} onChange={this.changeTargetType}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>
            <br/>
            {this.state.typeSelect !== "" && <select
                defaultValue="" onChange={this.editMeeting} key={this.state.typeSelect} className="select select-bordered w-full max-w-xs">
                <option value="">Select Meeting</option>
                {this.state.meetings.filter((meeting) => {return meeting.date.getFullYear() === this.state.typeSelect}).map((meeting, index) => {
                    return (
                        <option value={meeting._id} key={this.typeSelect + "_" + index}>{meetingToName(meeting.m_type) + " " + meeting.date.getFullYear()}</option>

                    );
                })}
            </select>}
            <br/>
            {this.state.currentMeeting !== undefined && this.state.meetings.map((meeting, index) =>{
                if(meeting === this.state.currentMeeting) {
                    return <CreateEditMeeting closeTab={this.onUpdated} key={index} meeting={this.state.currentMeeting}/>
                }
            })}
        </div>
    }

}

export default Meetings;