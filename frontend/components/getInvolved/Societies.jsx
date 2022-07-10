import React, {useCallback} from 'react';
import {getEvents} from '../../helpers/studentHelper';
import {useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import {tailwindParse} from "../../helpers/tailwindParse";

class Societies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    async componentDidMount(){
        const SSCs = await getSSCHeaders()
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
                {this.state.events.map((event, index) =>{
                    console.log(event.desc);
                    console.log(tailwindParse(event.desc))
                    return <div className="my-2 p-2 rounded border-2 border-amber-500 collapse collapse-arrow">
                        <input type="checkbox" className="peer"/>
                        <div className=" collapse-title text-3xl font-semibold">{event.name}</div>
                        <div className="collapse-content text-black">
                            {parse(tailwindParse(event.desc))}
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
export default function(props) {
    const navigate = useNavigate();

    return <Societies {...props} navigate={navigate} />;
}
