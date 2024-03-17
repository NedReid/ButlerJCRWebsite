import React from "react";
import { getSSCs } from "../../helpers/adminHelper";
import CreateEditSSC from "./CreateEditSSC";
import { SSCEnum, getSSCNames } from "../../models/SSCEnum";

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addingSSC: false, SSCs: [], currentSSC: undefined, typeSelect: "" };
        this.sscSelect = React.createRef();
    }

    async componentDidMount() {
        const SSCs = await getSSCs();
        this.setState({ SSCs: SSCs });
        console.log(SSCs);
    }

    editSSC = (event) => {
        const currentSSC = this.state.SSCs.find((ssc) => {
            return ssc._id === event.target.value;
        });
        console.log(currentSSC);
        this.setState({ currentSSC: currentSSC });
    };

    onUpdated = async () => {
        this.currentSSC = undefined;
        this.setState({ SSCs: [] });
        const SSCs = await getSSCs();
        this.setState({ SSCs: SSCs });
    };

    onCreated = async () => {
        this.setState({ addingSSC: false });
        this.setState({ SSCs: [] });
        const SSCs = await getSSCs();
        this.setState({ SSCs: SSCs });
    };

    changeTargetType = async (event) => {
        this.setState({ currentSSC: undefined });
        await this.setState({ typeSelect: parseInt(event.target.value) });
        this.forceUpdate();
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingSSC === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingSSC: true });
                        }}
                    >
                        Create SSC
                    </button>
                )}
                {this.state.addingSSC === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingSSC: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditSSC closeTab={this.onCreated} />
                    </>
                )}
                <br />
                Edit Current SSC:
                <br />
                <select
                    defaultValue=""
                    onChange={this.changeTargetType}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Type of SSC</option>
                    <option value={SSCEnum.society} key="SSCType">
                        Societies
                    </option>
                    <option value={SSCEnum.sport} key="SSCType">
                        Sports
                    </option>
                    <option value={SSCEnum.committee} key="SSCType">
                        Committees
                    </option>
                </select>
                <br />
                {this.state.typeSelect !== "" && (
                    <select
                        defaultValue=""
                        onChange={this.editSSC}
                        key={this.state.typeSelect}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select {getSSCNames(this.state.typeSelect)}</option>
                        {this.state.SSCs.filter((ssc) => {
                            return ssc.type === this.state.typeSelect;
                        }).map((ssc, index) => {
                            return (
                                <option value={ssc._id} key={this.typeSelect + "_" + index}>
                                    {ssc.name}
                                </option>
                            );
                        })}
                    </select>
                )}
                <br />
                {this.state.currentSSC !== undefined &&
                    this.state.SSCs.map((ssc, index) => {
                        if (ssc === this.state.currentSSC) {
                            return (
                                <CreateEditSSC
                                    closeTab={this.onUpdated}
                                    key={index}
                                    SSC={this.state.currentSSC}
                                />
                            );
                        }
                    })}
            </div>
        );

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
