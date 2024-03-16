import React from "react";
import {createOfficer, updateOfficer, deleteOfficer} from '../../helpers/adminHelper';
import officerModel from '../../models/roles/officerModel';
import {meetingToName, roleCategoryEnum, roleCategoryNames, meetingEnum} from "../../models/roles/roleEnums";

class CreateEditOfficer extends React.Component {
    constructor(props) {

        super(props);
        this.state = {officer: new officerModel(), currentCategory: ""};
        if (props.officer !== undefined) {
            console.log("notnull")
            this.state = {officer: props.officer}
            console.log(this.state.officer);
            const currentRole = props.roles.find(role => {
                return role._id === this.state.officer.role;
            });
            console.log(currentRole.category)
            this.setState({currentCategory: currentRole.category});
        }
        console.log(this.state.officer.name)
    }

    componentDidMount() {
        if (this.props.officer !== undefined) {
            const currentRole = this.props.roles.find(role => {
                return role._id === this.state.officer.role;
            });
            console.log(currentRole.category)
            this.setState({currentCategory: currentRole.category});
            this.forceUpdate()
        }
    }

    changeCategoryType = async (event) => {
        await this.setState({currentCategory: parseInt(event.target.value)});
        console.log("force updated")
        this.forceUpdate()
    }

    handleChange = (event, type) => {
        this.state.officer[type] = event.target.value;
        console.log(this.state.officer)
    }

    handleNumChange= (event, type) => {
        this.state.officer[type] = parseInt(event.target.value);
        console.log(this.state.officer)
    }

    handleBoolChange= (event, type) => {
        this.state.officer[type] = (event.target.value === 'true');
        console.log(this.state.officer)
    }

    handleSOs = (so) => {
        this.state.officer.so = so;
    }

    submitButton = async () => {
        if (this.props.officer !== undefined) {
            console.log(this.state.officer)
            await updateOfficer(this.state.officer);
        }
        else {
            await createOfficer(this.state.officer);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    deleteButton = async () => {
        await deleteOfficer(this.state.officer);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    render() {
        console.log("RENDERING")
        console.log(this.state.currentCategory)
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label>Officer Name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.officer.name} onChange={(event) => this.handleChange(event, "name")}/>
            </label>

            <label>Officer CIS Code:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                       name="username" type="text" defaultValue={this.state.officer.username} onChange={(event) => this.handleChange(event, "username")}/>
            </label>

            <label>Officer Role:</label>
            <select name="category" value={this.state.currentCategory} onChange={this.changeCategoryType} className="select select-bordered w-full max-w-xs">
                <option value="">Select Category</option>
                {Object.values(roleCategoryEnum).map((roleCategory) => {
                    return <option value={roleCategory} key="officerType">{roleCategoryNames(roleCategory)}</option>
                })}
            </select>
            {this.state.currentCategory !== "" &&
            <select key={this.state.currentCategory} name="category" defaultValue={this.state.officer.role} onChange={(event) => this.handleChange(event, "role")} className="select select-bordered w-full max-w-xs">
                <option value="">Select Officer</option>
                {this.props.roles.filter((role) => {return role.category === this.state.currentCategory}).map((role, index) => {
                    return (
                        <option value={role._id} key={this.typeSelect + "_" + index}>{role.name}</option>

                    );
                })}
            </select>}

            <label>Elected Meeting:</label>
            <select name="election_meeting" defaultValue={this.state.officer.election_meeting} onChange={(event) => this.handleNumChange(event, "election_meeting")} className="select select-bordered w-full max-w-xs">
                {Object.values(meetingEnum).map((meeting) => {
                    return <option value={meeting} key="election_meeting">{meetingToName(meeting)}</option>
                })}
            </select>

            <label> Elected Year:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="election_year"
                       type="number" defaultValue={this.state.officer.election_year} onChange={(event) => this.handleNumChange(event, "election_year")}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>

            <label> Current Officer:</label>
            <span>
                <label><input defaultChecked={this.state.officer.current === false}  onChange={(event) => this.handleBoolChange(event, "current")} type="radio" name={this.state.officer._id + "current"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.officer.current === true} onChange={(event) => this.handleBoolChange(event, "current")} type="radio" name={this.state.officer._id + "current"} value={true}/>
                True</label>
            </span>


            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-700">Remove Officer?!</h3>
                    <p className="py-4">Are you sure you want to remove this officer?</p>
                    <div className="modal-action">
                        <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">Yes</label>
                        <label htmlFor="my-modal" className="btn">No</label>
                    </div>
                </div>
            </div>

        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Officer</button>
        {this.props.officer !== undefined && <label htmlFor="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Officer</label>}

        </>
    }

}

export default CreateEditOfficer;