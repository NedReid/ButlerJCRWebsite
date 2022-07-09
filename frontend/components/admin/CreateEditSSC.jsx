import React from "react";
import {createSSC, updateSSC} from '../../helpers/adminHelper';
import SSCModel from '../../models/SSCModel';
import {SSCEnum} from "../../models/SSCEnum";

class CreateEditSSC extends React.Component {
    constructor(props) {

        super(props);
        this.state = {SSC: new SSCModel()};
        if (props.SSC !== undefined) {
            console.log("notnull")
            this.state = {SSC: props.SSC}
            console.log(this.state.SSC);
        }
        console.log(this.state.SSC.name)
    }

    handleChange = (event, type) => {
        this.state.SSC[type] = event.target.value;
        console.log(this.state.SSC)
    }
    handleNumChange= (event, type) => {
        this.state.SSC[type] = parseInt(event.target.value);
        console.log(this.state.SSC)
    }

    submitButton = async (event) => {
        if (this.props.SSC !== undefined) {
            await updateSSC(this.state.SSC);
        }
        else {
            await createSSC(this.state.SSC);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.SSC.editors.length) {
            this.state.SSC.editors.push("");
        }
        while (num < this.state.SSC.editors.length) {
            this.state.SSC.editors.pop();
        }
        this.forceUpdate();
    }

    updateEditor = (event, ind) => {
        this.state.SSC.editors[ind] = event.target.value;
    }

    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label> SSC Name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.SSC.name} onChange={(event) => this.handleChange(event, "name")}/>
            </label>


            <label> Number of Editors:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noEditors"
                       type="number" defaultValue={this.state.SSC.editors.length} onChange={this.setArrayLength}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>
            {this.state.SSC.editors.map((opt, index) => {
                return  <label className="flex"> Editor {index + 1} CIS Code:
                    <input className=" mx-2 mb-2 rounded border-2 border-slate-500 flex-grow"
                           name="questionText" type="text" defaultValue={this.state.SSC.editors[index]} key={this.state.SSC._id + "editor" + index} onChange={(event) => this.updateEditor(event, index)}/>
                </label>
            })

            }

            <label>SSC Type:</label>
            <span>
                <label><input defaultChecked={this.state.SSC.type === SSCEnum.society}  onChange={(event) => this.handleNumChange(event, "type")} type="radio" id="ts1" name={this.state.SSC._id + "SSCType"} value={SSCEnum.society}/>
                Society</label>
                <label className="ml-4"><input defaultChecked={this.state.SSC.type === SSCEnum.sport} onChange={(event) => this.handleNumChange(event, "type")} type="radio" id="ts2" name={this.state.SSC._id + "SSCType"} value={SSCEnum.sport}/>
                Sport</label>
                <label className="ml-4"><input defaultChecked={this.state.SSC.type === SSCEnum.committee} onChange={(event) => this.handleNumChange(event, "type")} type="radio" id="ts3" name={this.state.SSC._id + "SSCType"} value={SSCEnum.committee}/>
                Committee</label>
            </span>



        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit SSC</button>
        </>
    }

}

export default CreateEditSSC;