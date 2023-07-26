import React from "react";
import {updateAdminPerms, createAdminPerms, deleteAdminPerms} from '../../helpers/adminHelper';
import adminPermModel from "../../models/adminPermModel";

class CreateEditAdminPerm extends React.Component {
    constructor(props) {

        super(props);
        this.state = {adminPerm: new adminPermModel()};
        if (props.adminPerm !== undefined) {
            this.state = {adminPerm: props.adminPerm}
        }
    }

    handleChange = (event, type) => {
        this.state.adminPerm[type] = event.target.value;
        console.log(this.state.adminPerm)
    }

    handleBoolChange= (event, type) => {
        this.state.adminPerm[type] = (event.target.value === 'true');
        console.log(this.state.adminPerm)
    }

    submitButton = async (event) => {
        if (this.props.adminPerm !== undefined) {
            console.log(this.state.adminPerm)
            await updateAdminPerms(this.state.adminPerm);
        }
        else {
            await createAdminPerms(this.state.adminPerm);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }


    deleteButton = async (event) => {
        await deleteAdminPerms(this.state.adminPerm);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }


    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label> Admin username:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="username" type="text" defaultValue={this.state.adminPerm.username} onChange={(event) => this.handleChange(event, "username")}/>
            </label>

            <label> events:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.events === false}  onChange={(event) => this.handleBoolChange(event, "events")} type="radio" name={this.state.adminPerm._id + "events"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.events === true} onChange={(event) => this.handleBoolChange(event, "events")} type="radio" name={this.state.adminPerm._id + "events"} value={true}/>
                True</label>
            </span>
            <label> finance:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.finance === false}  onChange={(event) => this.handleBoolChange(event, "finance")} type="radio" name={this.state.adminPerm._id + "finance"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.finance === true} onChange={(event) => this.handleBoolChange(event, "finance")} type="radio" name={this.state.adminPerm._id + "finance"} value={true}/>
                True</label>
            </span>
            <label> SSCs:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.SSCs === false}  onChange={(event) => this.handleBoolChange(event, "SSCs")} type="radio" name={this.state.adminPerm._id + "SSCs"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.SSCs === true} onChange={(event) => this.handleBoolChange(event, "SSCs")} type="radio" name={this.state.adminPerm._id + "SSCs"} value={true}/>
                True</label>
            </span>
            <label> pagePerms:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.pagePerms === false}  onChange={(event) => this.handleBoolChange(event, "pagePerms")} type="radio" name={this.state.adminPerm._id + "pagePerms"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.pagePerms === true} onChange={(event) => this.handleBoolChange(event, "pagePerms")} type="radio" name={this.state.adminPerm._id + "pagePerms"} value={true}/>
                True</label>
            </span>
            <label> adminPerms:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.adminPerms === false}  onChange={(event) => this.handleBoolChange(event, "adminPerms")} type="radio" name={this.state.adminPerm._id + "adminPerms"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.adminPerms === true} onChange={(event) => this.handleBoolChange(event, "adminPerms")} type="radio" name={this.state.adminPerm._id + "adminPerms"} value={true}/>
                True</label>
            </span>
            <label> democracy:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.democracy === false}  onChange={(event) => this.handleBoolChange(event, "democracy")} type="radio" name={this.state.adminPerm._id + "democracy"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.democracy === true} onChange={(event) => this.handleBoolChange(event, "democracy")} type="radio" name={this.state.adminPerm._id + "democracy"} value={true}/>
                True</label>
            </span>
            <label> postCategories:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.postCategories === false}  onChange={(event) => this.handleBoolChange(event, "postCategories")} type="radio" name={this.state.adminPerm._id + "postCategories"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.postCategories === true} onChange={(event) => this.handleBoolChange(event, "postCategories")} type="radio" name={this.state.adminPerm._id + "postCategories"} value={true}/>
                True</label>
            </span>
            <label> photos:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.photos === false}  onChange={(event) => this.handleBoolChange(event, "photos")} type="radio" name={this.state.adminPerm._id + "photos"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.photos === true} onChange={(event) => this.handleBoolChange(event, "photos")} type="radio" name={this.state.adminPerm._id + "photos"} value={true}/>
                True</label>
            </span>
            <label> freshers:</label>
            <span>
                <label><input defaultChecked={this.state.adminPerm.freshers === false}  onChange={(event) => this.handleBoolChange(event, "freshers")} type="radio" name={this.state.adminPerm._id + "freshers"} value={false}/>
                False</label>
                <label className="ml-2"><input defaultChecked={this.state.adminPerm.freshers === true} onChange={(event) => this.handleBoolChange(event, "freshers")} type="radio" name={this.state.adminPerm._id + "freshers"} value={true}/>
                True</label>
            </span>

            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-700">Remove Admin?!</h3>
                    <p className="py-4">Are you sure you want to remove this Admin?</p>
                    <div className="modal-action">
                        <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">Yes</label>
                        <label htmlFor="my-modal" className="btn">No</label>
                    </div>
                </div>
            </div>


        </div>
        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Save Perms</button>
        {this.props.adminPerm !== undefined && <label for="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Admin</label>}

        </>
    }

}

export default CreateEditAdminPerm;