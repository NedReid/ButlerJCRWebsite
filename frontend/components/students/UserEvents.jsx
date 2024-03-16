import React from 'react';
import {getEvents} from '../../helpers/studentHelper';
import {useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import {tailwindParse} from "../../helpers/tailwindParse";

class UserEventsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    async componentDidMount(){
        const events = await getEvents()
        console.log("events = ", events)
        this.setState({events: events});
        console.log(events)
    }

    navigate = (id) =>
    {
        this.props.navigate('book:' + id, {replace: false})
    }

    render() {

        // const handleOnClick =(id) => navigate('/book:' + id)
        // const handleOnClick = (id) => console.log(id)
        return <div className="my-2 p-8">
            <div className="text-4xl font-bold">Events:</div>
            {this.state.events.length > 0 && <>
            {this.state.events.map((event) =>{
                    console.log(event.desc);
                    console.log(tailwindParse(event.desc))
                    return <div key={event._id} className="my-2 p-2 rounded border-2 border-amber-500 collapse collapse-arrow">
                        <input type="checkbox" className="peer"/>
                        <div className=" collapse-title text-3xl font-semibold">{event.name}</div>
                        <div className="collapse-content text-black">
                            <div className="bangle-editor prose">
                                {parse(tailwindParse(event.desc))}
                            </div>
                            <hr/>
                            <div>Ticket release: {event.ticketReleaseDate.toString()}</div>
                            <div>Ticket deadline: {event.ticketReleaseDeadline.toString()}</div>
                            <div>Number of tickets available: {event.noTickets}</div>
                        </div>
                        {/*{!!event.ticketReleaseDate.getTime && -event.ticketReleaseDate.getTime() + Date.now()} { Date.now() - event.ticketReleaseDate.getTime()}*/}
                        {Date.parse(event.ticketReleaseDate) < Date.now() && Date.now() < Date.parse(event.ticketReleaseDeadline) && <div>
                            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => this.navigate(event._id)}>Book Tickets</button>

                        </div> }


                    </div>
                })}
                </>}
        </div>

    }

}

const UserEvents = (props) => {
    const navigate = useNavigate();

    return <UserEventsComponent {...props} navigate={navigate} />;
}

export default UserEvents