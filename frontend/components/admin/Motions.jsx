import React from 'react';
import {getMotions, getMeetingHeaders} from '../../helpers/adminHelper';
import CreateEditMotion from './CreateEditMotion';
import {meetingToName, methodEnum, roleCategoryEnum, roleCategoryNames} from "../../models/roles/roleEnums";

class Motions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingMotion: false, motions: [], currentMotion: undefined, typeSelect:2022, meetingSelect: "", meetings:[]};
        this.motionSelect = React.createRef()
    }

    async componentDidMount(){
        const meetings = await getMeetingHeaders()
        const motions = await getMotions()
        this.setState({motions: motions, meetings: meetings});
        console.log(motions)
    }

    editMotion = (event) => {
        const currentMotion = this.state.motions.find(motion => {
            return motion._id === event.target.value;
        });
        console.log(currentMotion)
        this.setState({currentMotion: currentMotion});
    }

    onUpdated = async () => {
        this.currentMotion = undefined;
        this.setState({motions: []})
        const motions = await getMotions()
        this.setState({motions: motions});
    }

    onCreated = async () => {
        this.setState({addingMotion: false});
        this.setState({motions: []})
        const motions = await getMotions()
        this.setState({motions: motions});
    }

    changeTargetType = async (event) => {
        this.setState({currentMotion: undefined, meetingSelect: ""})
        await this.setState({typeSelect: parseInt(event.target.value)});
        this.forceUpdate()
    }

    changeTargetMeeting = async (event) => {
        this.setState({currentMotion: undefined})
        await this.setState({meetingSelect: event.target.value});
        this.forceUpdate()
    }


    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingMotion === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingMotion: true})}}>Create Motion</button>
            }
            {this.state.addingMotion === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingMotion: false})}}>Cancel</button>
                <CreateEditMotion closeTab={this.onCreated} meetings={this.state.meetings}/>
            </>}
            <br/>
            Edit Current Motion:
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
                defaultValue="" onChange={this.changeTargetMeeting} key={this.state.typeSelect} className="select select-bordered w-full max-w-xs">
                <option value="">Select Meeting}</option>
                {this.state.meetings.filter((meeting) => {return meeting.date.getFullYear() === this.state.typeSelect}).map((meeting, index) => {
                    return (
                        <option value={meeting._id} key={this.typeSelect + "_" + index}>{meetingToName(meeting.m_type) + " " + meeting.date.getFullYear()}</option>

                    );
                })}
            </select>}
            <br/>
            {this.state.meetingSelect !== "" && <select
                defaultValue="" onChange={this.editMotion} key={this.state.meetingSelect} className="select select-bordered w-full max-w-xs">
                <option value="">Select Motion</option>
                {this.state.motions.filter((motion) => {return motion.meeting === this.state.meetingSelect}).map((motion, index) => {
                    return (
                        <option value={motion._id} key={this.meetingSelect + "_" + index}>{motion.name}</option>

                    );
                })}
            </select>}
            <br/>
            {this.state.currentMotion !== undefined && this.state.motions.map((motion, index) =>{
                if(motion === this.state.currentMotion) {
                    return <CreateEditMotion closeTab={this.onUpdated} key={index} motion={this.state.currentMotion} meetings={this.state.meetings}/>
                }
            })}
        </div>
    }

}

export default Motions;