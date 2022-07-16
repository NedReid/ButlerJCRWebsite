import React from "react";
import {createEvent, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import SSCModel from "../../models/SSCModel";
import {updateSSC, getSSC} from "../../helpers/getInvolvedHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";

class EditSSC extends React.Component {
    constructor(props) {

        super(props);
        let SSCId = this.props.params["id"].substring(1);
        console.log(SSCId)
        this.state = {SSC: undefined, SSCId: SSCId};
    }

    async componentDidMount() {
        const SSC = await getSSC(this.state.SSCId)
        this.setState({SSC: SSC});
        console.log(SSC)
    }

    handleChange = (event, type) => {
        this.state.SSC[type] = event.target.value;
        console.log(this.state.SSC)
    }

    handleBoolChange= (event, type) => {
        this.state.SSC[type] = (event.target.value === 'true');
        console.log(this.state.SSC)
    }



    handlePage = (page) => {
        this.state.SSC.page = page;
    }


    submitButton = async (event) => {
        await updateSSC(this.state.SSC);

        this.props.navigate("get-involved/" + this.state.SSC.slug, {replace: true})

    }


    render() {
        console.log("RENDERING")
        if (this.state.SSC !== undefined) {
            return <>
                <div className="mt-4 text-3xl font-semibold">Editing {this.state.SSC.name}</div>

                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

                    <label> SSC Name:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                               name="name" type="text" defaultValue={this.state.SSC.name}
                               onChange={(event) => this.handleChange(event, "name")}/>
                    </label>

                    <label> SSC Description:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                               name="name" type="text" defaultValue={this.state.SSC.desc}
                               onChange={(event) => this.handleChange(event, "desc")}/>
                    </label>

                    <label> SSC Slug:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                               name="name" type="text" defaultValue={this.state.SSC.slug}
                               onChange={(event) => this.handleChange(event, "slug")}
                                onKeyPress={(event) => {
                                    if (!/[[a-z0-9\-]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}/>
                    </label>

                    <label> Visible:</label>
                    <span>
                        <label><input defaultChecked={this.state.SSC.visible === false}
                                      onChange={(event) => this.handleBoolChange(event, "visible")} type="radio"
                                      name={this.state.SSC._id + "visible"} value={false}/>
                        False</label>
                        <label className="ml-2"><input defaultChecked={this.state.SSC.visible === true}
                                                       onChange={(event) => this.handleBoolChange(event, "visible")}
                                                       type="radio" name={this.state.SSC._id + "visible"} value={true}/>
                        True</label>
                    </span>

                <label> SSC Page:</label>
                <div className="p-1 rounded border-2 border-slate-500">
                    <TextEditor initialValue={this.state.SSC.page} onUpdate={this.handlePage} />

                </div>

                </div>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={this.submitButton}>Submit SSC
                </button>
            </>
        }else {
                return <Loading></Loading>
            }
    }

}

export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <EditSSC {...props} params={params} navigate={navigate} />;
}