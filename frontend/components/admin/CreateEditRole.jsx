import React from "react";
import {createRole, updateRole, deleteRole} from '../../helpers/adminHelper';
import roleModel from '../../models/roles/roleModel';
import {meetingToName, methodEnum, methodName, roleCategoryEnum, roleCategoryNames, meetingEnum} from "../../models/roles/roleEnums";
import TextEditor from "../global/TextEditor";

class CreateEditRole extends React.Component {
    constructor(props) {

        super(props);
        this.state = {role: new roleModel()};
        if (props.role !== undefined) {
            console.log("notnull")
            this.state = {role: props.role}
            console.log(this.state.role);
        }
        console.log(this.state.role.name)
    }

    handleChange = (event, type) => {
        this.state.role[type] = event.target.value;
        console.log(this.state.role)
    }

    handleNumChange= (event, type) => {
        this.state.role[type] = parseInt(event.target.value);
        console.log(this.state.role)
    }

    handleSOs = (so) => {
        this.state.role.so = so;
    }

    submitButton = async () => {
        if (this.props.role !== undefined) {
            console.log(this.state.role)
            await updateRole(this.state.role);
        }
        else {
            await createRole(this.state.role);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    deleteButton = async () => {
        await deleteRole(this.state.role);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label>Role Name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.role.name} onChange={(event) => this.handleChange(event, "name")}/>
            </label>

            <label>Role URL Slug:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                       name="slug" type="text" defaultValue={this.state.role.slug} onChange={(event) => this.handleChange(event, "slug")}
                       onKeyPress={(event) => {
                           if (!/[[a-z0-9-]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}/>
            </label>

            <label>Role Standing Orders:</label>
            <div className="p-1 rounded border-2 border-slate-500">
                <TextEditor initialValue={this.state.role.so} onUpdate={this.handleSOs} />
            </div>

            <label>Elected Meeting:</label>
            <select name="e_meeting" defaultValue={this.state.role.e_meeting} onChange={(event) => this.handleNumChange(event, "e_meeting")} className="select select-bordered w-full max-w-xs">
                {Object.values(meetingEnum).map((meeting) => {
                    return <option value={meeting} key="roleType">{meetingToName(meeting)}</option>
                })}
            </select>

            <label> Number of seats:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="e_seats"
                       type="number" defaultValue={this.state.role.e_seats} onChange={(event) => this.handleNumChange(event, "e_seats")}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>

            <label>Type of election:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                       name="e_type" type="text" defaultValue={this.state.role.e_type} onChange={(event) => this.handleChange(event, "e_type")}/>
            </label>

            <label>Election Method:</label>
            <select defaultValue={this.state.role.e_method} onChange={(event) => this.handleNumChange(event, "e_method")} className="select select-bordered w-full max-w-xs">
                {Object.values(methodEnum).map((method) => {
                    return <option value={method} key="roleType">{methodName(method)}</option>
                })}
            </select>

            <label>Role Category:</label>
            <select name="category" defaultValue={this.state.role.category} onChange={(event) => this.handleNumChange(event, "category")} className="select select-bordered w-full max-w-xs">
                {Object.values(roleCategoryEnum).map((roleCategory) => {
                    return <option value={roleCategory} key="roleType">{roleCategoryNames(roleCategory)}</option>
                })}
            </select>

            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-700">Remove Role?!</h3>
                    <p className="py-4">Are you sure you want to remove this role?</p>
                    <div className="modal-action">
                        <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">Yes</label>
                        <label htmlFor="my-modal" className="btn">No</label>
                    </div>
                </div>
            </div>

        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Role</button>
        {this.props.role !== undefined && <label htmlFor="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Role</label>}

        </>
    }

}

export default CreateEditRole;