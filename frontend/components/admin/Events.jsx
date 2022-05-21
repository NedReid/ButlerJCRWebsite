import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import CreateEvent from './CreateEvent';
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingEvent: false};
    }


    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingEvent: true})}}>Create Event</button>
            {this.state.addingEvent === true && <CreateEvent/>}
        </div>

    }

}

export default Events;