import React from 'react';
import {getEvents} from '../../helpers/adminHelper';
import CreateEditEvent from './CreateEditEvent';
import {menuItems} from "../global/menuItems";
import {Link} from "react-router-dom";

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingEvent: false, events: [], currentEvent: undefined};
    }

    async componentDidMount(){
        const events = await getEvents()
        this.setState({events: events});
        console.log(events)
    }

    editEvent = (event) => {
        const currentEvent = this.state.events.find(events => {
            return events._id === event.target.value;
        });
        console.log(currentEvent)
        this.setState({currentEvent: currentEvent});
    }

    onUpdated = async () => {
        this.currentEvent = undefined;
        this.setState({events: []})
        const events = await getEvents()
        this.setState({events: events});
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingEvent === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: true})}}>Create Event</button>
            }
            {this.state.addingEvent === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: false})}}>Cancel</button>
                <CreateEditEvent closeTab={() => this.setState({addingEvent: false})}/>
            </>}
            <br/>
            {this.state.events.length > 0 && <>
                Edit Current Events:
                <br/>
                <select onChange={this.editEvent} className="select select-bordered w-full max-w-xs">
                    <option value="" selected>Select Event</option>
                    {this.state.events.map((event, index) => {
                        return (
                            <option value={event._id} key={index}>{event.name}</option>
                        );
                    })}

                </select>
                {this.state.events.map((event, index) =>{
                    if(event === this.state.currentEvent) {
                        return <CreateEditEvent closeTab={this.onUpdated} id={index} event={this.state.currentEvent}/>
                    }
                })}
            </>
            }

        </div>

    }

}

export default Events;