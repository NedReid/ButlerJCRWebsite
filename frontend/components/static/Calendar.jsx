import React from 'react';
import {getCalendarEventSelection} from "../../helpers/staticHelper";
import Loading from "../global/Loading";
import {AiFillEnvironment, AiOutlineLink} from "react-icons/ai";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid"
import {useNavigate, useParams} from "react-router-dom";
import {getCalendarEventPreviews} from "../../helpers/staticHelper";
import {calendarEventTypeColor} from "../../models/calendarEventEnum";
import {calendarEventModel} from "../../models/calendarEventModel";
import {Collapse} from "react-daisyui";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        const tooltip = {x: 0, y: 0, visible: false, hovered: false, title: "", event: undefined}
        this.state = {tooltip: tooltip , events: undefined, loadedEventsInRange: undefined, loadedEvents: [], rangeStart:0, rangeEnd:0}
    }



    async componentDidMount() {
        const events = await getCalendarEventPreviews()
        const eventsModels = events.map((event) => {return new calendarEventModel(event)})
        this.setState({events: eventsModels});
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.rangeStart !== prevState.rangeStart || this.state.rangeEnd !== prevState.rangeEnd) {
            await this.setState({loadedEventsInRange: undefined})
            let eventsInRange = this.state.events.filter((event) => {
                return ((event.startDate >= this.state.rangeStart && event.endDate <= this.state.rangeEnd) ||
                        (event.startDate >= this.state.rangeStart && event.startDate < this.state.rangeEnd) ||
                        (event.endDate > this.state.rangeStart && event.endDate <= this.state.rangeEnd) ||
                        (event.startDate < this.state.rangeStart && event.endDate >= this.state.rangeEnd))
            })
            const idsInRange = eventsInRange.map((event) => {return event._id});
            let eventsToLoad = eventsInRange.filter((event) => {
                const tEvent = this.state.loadedEvents.filter((lEvent) => {
                    return (lEvent._id === event._id)
                })
                return tEvent.length === 0
            })
            const idsToLoad = eventsToLoad.map((event) => {return event._id});
            let loadedEvents = await getCalendarEventSelection(idsToLoad);
            loadedEvents = loadedEvents.map((event) => {return new calendarEventModel(event)})

            const allLoadedEvents = this.state.loadedEvents.concat(loadedEvents)
            await this.setState({loadedEvents: allLoadedEvents});
            const loadedEventsInRange = allLoadedEvents.filter((event) => {
              return idsInRange.includes(event._id)
            })
            await this.setState({loadedEventsInRange: loadedEventsInRange})
        }
    }

    eventClick = (eventClickInfo) => {
        const checkbox = document.getElementById("toggle" + eventClickInfo.event.id);
        checkbox.checked = true;
        const element = document.getElementById("desc" + eventClickInfo.event.id);
        element.scrollIntoView({behavior: "smooth"})
    }

    mouseEnter = (mouseEnterInfo) => {
        console.log(mouseEnterInfo)
        mouseEnterInfo.el.className = mouseEnterInfo.el.className + " hover:cursor-pointer hover:brightness-90"
        this.state.tooltip.x = Math.min(mouseEnterInfo.jsEvent.pageX, window.innerWidth - 180);
        this.state.tooltip.y = mouseEnterInfo.jsEvent.pageY;
        this.state.tooltip.visible = true;
        this.state.tooltip.title = mouseEnterInfo.event.title;
        const id = mouseEnterInfo.event.id
        this.state.tooltip.event = this.state.events.filter((event) => {
            return (event._id === id)
        })[0]
        this.forceUpdate();
    }

    mouseLeave = () => {
        this.state.tooltip.visible = false;
        this.forceUpdate();
    }

    tooltipMouseEnter = () => {
        this.state.tooltip.visible = true;
        this.forceUpdate();
    }

    tooltipMouseLeave = () => {
        this.state.tooltip.visible = false;
        this.forceUpdate();
    }
    tooltipEventClick = () => {
        const checkbox = document.getElementById("toggle" + this.state.tooltip.event._id);
        checkbox.checked = true;
        const element = document.getElementById("desc" + this.state.tooltip.event._id);
        element.scrollIntoView({behavior: "smooth"})
    }


    editCalendar = () => {
        this.props.navigate("/calendar/edit", {replace: false})
    }

    getEventRange =  (fetchInfo, successCallback) => {
        // console.log(fetchInfo)
        this.setState({rangeStart: fetchInfo.start.valueOf(), rangeEnd: fetchInfo.end.valueOf()})

        const calendarEventSelection = this.state.events.map((ev) => {
            return { title: ev.title, allDay: ev.allDay, start: ev.startDate, end:ev.endDate, borderColor:calendarEventTypeColor(ev.category) , backgroundColor:calendarEventTypeColor(ev.category), id: ev._id}
        })
        successCallback(calendarEventSelection)

    }

    dateText = (start, end, allDay) => {
        if (allDay) {
            if ((end.valueOf() - start.valueOf()) < 1000 * 60 * 60 * 47) {
                return start.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month:"long", year:"numeric"})
            }
            else {
                const actualEnd = (new Date(end));
                actualEnd.setDate(end.getDate() - 1)
                if (start.getMonth() === actualEnd.getMonth()) {
                    return start.toLocaleDateString("en-GB", {day: "numeric"}) + "-" + actualEnd.toLocaleDateString("en-GB", {day: "numeric"}) + " " + start.toLocaleDateString("en-GB", { month:"long", year:"numeric"})
                }
                else {
                    return start.toLocaleDateString("en-GB", {day: "numeric", month:"long", year:"numeric"}) + " - " + actualEnd.toLocaleDateString("en-GB", {day: "numeric", month:"long", year:"numeric"})
                }
            }
        }
        else {
            const prevDayEnd = (new Date(end));
            prevDayEnd.setDate(end.getDate() - 1)
            if ((start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) ||
                (start.getFullYear() === prevDayEnd.getFullYear() && start.getMonth() === prevDayEnd.getMonth() && start.getDate() === prevDayEnd.getDate()) && prevDayEnd.getHours() < 6) {
                return start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + "-" + end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + ", " + start.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month:"long", year:"numeric"})
            }
            else {
                return start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + ", " + start.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month:"long", year:"numeric"}) + " - " + end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + ", " + end.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month:"long", year:"numeric"})

            }
        }
    }


    render() {
        // console.log(this.state.events)
        if (this.state.events !== undefined){
            return <>
                {this.props.admin.events && <div className="bg-slate-500 text-white w-full h-12 pl-2 flex">
                        <div className="w-full h-12 flex flex-grow items-center">You have permission to edit calendar events.</div>
                        <button className={"flex-grow-0 flex-shrink-0 w-16 h-12 bg-slate-600 px-1 ml-1 transition hover:bg-slate-700"} onClick={this.editCalendar}>
                            Edit
                        </button>
                    </div>
                }
                <div className="m-4">
                <div className="mb-4 font-semibold text-4xl">JCR Calendar</div>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    events={this.getEventRange}
                    eventMouseEnter={this.mouseEnter}
                    eventMouseLeave={this.mouseLeave}
                    eventClick={this.eventClick}
                    displayEventTime={false}
                    height="auto"

                ></FullCalendar>
            </div>
            <div style={{top: this.state.tooltip.y + "px", left: this.state.tooltip.x + "px"}} onMouseOver={this.tooltipMouseEnter} onMouseLeave={this.tooltipMouseLeave}
                 className={"w-40 bg-white absolute z-20 border-2 border-gray-400 hover:cursor-pointer hover:brightness-95" + (this.state.tooltip.visible? "" : " hidden")} onClick={this.tooltipEventClick}>
                <div className="flex w-full h-full">
                    <div className="ml-2 mr-1 my-1 w-1" style={{backgroundColor: calendarEventTypeColor(this.state.tooltip.visible? this.state.tooltip.event.category : 0)}}>&nbsp;</div>
                    <div>
                        <div className="text-sm font-bold"> {this.state.tooltip.title}</div>
                        <div className="text-sm flex items-center mb-1"><AiFillEnvironment className="font-bold mr-1"/> {this.state.tooltip.visible? this.state.tooltip.event.location : ""}</div>
                        <div className="text-sm italic">{this.state.tooltip.visible? this.state.tooltip.event.shortDescription : ""}</div>
                    </div>
                </div>

            </div>
            <div className="m-4">
                {this.state.loadedEventsInRange !== undefined?
                    <>
                        {this.state.loadedEventsInRange.map((event) => {
                            return <Collapse key={event._id} className="my-2 hover:bg-gray-100 active:bg-gray-200" icon="arrow" id={"desc" + event._id}>
                                <input id={"toggle" + event._id} type="checkbox" className="peer"/>

                                <Collapse.Title className="border-l-4" style={{borderColor: calendarEventTypeColor(event.category)}}>
                                    <div className="text-xl font-semibold">{event.title}</div>
                                    <div className="">{this.dateText(event.startDate, event.endDate, event.allDay)}</div>
                                </Collapse.Title>
                                <Collapse.Content className="bg-white border-l-4 border-gray-200">
                                    {event.location !== "" && <div className="flex items-center mb-1"><AiFillEnvironment className="font-bold mr-1"/> {event.location}</div>}
                                    {event.link !== "" && <div className="flex items-center mb-1"><AiOutlineLink className="font-bold mr-1"/> <a className="link" href={event.link}>{event.link}</a></div>}

                                    <div className="bangle-editor prose max-w-none">
                                        {parse(tailwindParse(event.description))}
                                    </div>

                                </Collapse.Content>

                            </Collapse>
                        })}
                    </>
                    :
                    <Loading/>
                }
            </div>




        </>}
        else {
            return <Loading></Loading>
        }



    }

}

const Calendar = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <CalendarComponent {...props} params={params} navigate={navigate} />;
}

export default Calendar