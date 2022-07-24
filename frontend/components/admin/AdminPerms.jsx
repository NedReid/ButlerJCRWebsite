import React from 'react';
import {getAdminPerms} from "../../helpers/adminHelper";
import CreateEditAdminPerms from "./CreateEditAdminPerms";



class AdminPerms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingPerm: false, adminPerms: [], currentPerm: undefined};
    }

    async componentDidMount(){
        const adminPerms = await getAdminPerms()
        this.setState({adminPerms: adminPerms});
        console.log(adminPerms);
    }

    editAdminPerm = (event) => {
        const currentPerm = this.state.adminPerms.find(admin => {
            return admin._id === event.target.value;
        });
        console.log(currentPerm)
        this.setState({currentPerm: currentPerm});
    }

    onUpdated = async () => {
        this.currentPerm = undefined;
        this.setState({adminPerms: []})
        const adminPerms = await getAdminPerms()
        this.setState({adminPerms: adminPerms});
    }

    onCreated = async () => {
        this.setState({addingPerm: false});
        this.setState({adminPerms: []})
        const adminPerms = await getAdminPerms()
        this.setState({adminPerms: adminPerms});
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingPerm === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingPerm: true})}}>Add Admin</button>
            }
            {this.state.addingPerm === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingPerm: true})}}>Cancel</button>
                <CreateEditAdminPerms closeTab={this.onCreated}/>
            </>}
            <br/>
            Edit Current Admin Permissions:
            <br/>

            <select defaultValue="" onChange={this.editAdminPerm} key="adminPerms" className="select select-bordered w-full max-w-xs">
                <option value="">Select Admin</option>
                {this.state.adminPerms.map((admin, index) => {
                    return (
                        <option value={admin._id} key={"admin_" + index}>{admin.username}</option>

                    );
                })}
            </select>
            <br/>
            {this.state.currentPerm !== undefined && this.state.adminPerms.map((admin, index) =>{
                if(admin === this.state.currentPerm) {
                    return <CreateEditAdminPerms closeTab={this.onUpdated} key={index} adminPerm={this.state.currentPerm}/>
                }
            })}
        </div>
    }

}

export default AdminPerms;