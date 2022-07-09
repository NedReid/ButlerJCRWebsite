import React from 'react';
import {getSSCs} from '../../helpers/adminHelper';
import CreateEditSSC from './CreateEditSSC';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingSSC: false, SSCs: [], currentSSC: undefined};
    }

    async componentDidMount(){
        const SSCs = await getSSCs()
        this.setState({SSCs: SSCs});
        console.log(SSCs)
    }

    // editEvent = (event) => {
    //     const currentEvent = this.state.events.find(events => {
    //         return events._id === event.target.value;
    //     });
    //     console.log(currentEvent)
    //     this.setState({currentEvent: currentEvent});
    // }

    onUpdated = async () => {
        this.currentEvent = undefined;
        this.setState({events: []})
        const events = await getEvents()
        this.setState({events: events});
    }

    onCreated = async () => {
        this.setState({addingEvent: false});
        this.setState({events: []})
        const events = await getEvents()
        this.setState({events: events});
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingSSC === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingSSC: true})}}>Create SSC</button>
            }
            {this.state.addingSSC === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingSSC: false})}}>Cancel</button>
                <CreateEditSSC closeTab={this.onCreated}/>
            </>}

        </div>


        // {this.state.addingEvent === false &&
        // <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: true})}}>Create Event</button>
        // }
        // {this.state.addingEvent === true && <>
        //     <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: false})}}>Cancel</button>
        //     <CreateEditEvent closeTab={this.onCreated}/>
        // </>}
        // <br/>
        // {this.state.events.length > 0 && <>
        //     Edit Current Events:
        //     <br/>
        //     <select defaultValue="" onChange={this.editEvent} className="select select-bordered w-full max-w-xs">
        //         <option value="">Select Event</option>
        //         {this.state.events.map((event, index) => {
        //             return (
        //                 <option value={event._id} key={index}>{event.name}</option>
        //             );
        //         })}
        //
        //     </select>
        //     {this.state.events.map((event, index) =>{
        //         if(event === this.state.currentEvent) {
        //             return <CreateEditEvent closeTab={this.onUpdated} key={index} event={this.state.currentEvent}/>
        //         }
        //     })}
        // </>
        // }
        //
        // <div className="text-2xl text-semibold text-black text-xl text-lg list-disc list-decimal bg-slate-200 ml-1 px-2 py-1">
        //
        // </div>
    }

}

export default Events;