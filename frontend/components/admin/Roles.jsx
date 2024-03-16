import React from 'react';
import {getRoles} from '../../helpers/adminHelper';
import CreateEditRole from './CreateEditRole';
import {roleCategoryEnum, roleCategoryNames} from "../../models/roles/roleEnums";

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingRole: false, roles: [], currentRole: undefined, typeSelect:""};
        this.roleSelect = React.createRef()
    }

    async componentDidMount(){
        const roles = await getRoles()
        this.setState({roles: roles});
        console.log(roles)
    }

    editRole = (event) => {
        const currentRole = this.state.roles.find(role => {
            return role._id === event.target.value;
        });
        console.log(currentRole)
        this.setState({currentRole: currentRole});
    }

    onUpdated = async () => {
        this.currentRole = undefined;
        this.setState({roles: []})
        const roles = await getRoles()
        this.setState({roles: roles});
    }

    onCreated = async () => {
        this.setState({addingRole: false});
        this.setState({roles: []})
        const roles = await getRoles()
        this.setState({roles: roles});
    }

    changeTargetType = async (event) => {
        this.setState({currentRole: undefined})
        await this.setState({typeSelect: parseInt(event.target.value)});
        this.forceUpdate()
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingRole === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingRole: true})}}>Create Role</button>
            }
            {this.state.addingRole === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingRole: false})}}>Cancel</button>
                <CreateEditRole closeTab={this.onCreated}/>
            </>}
            <br/>
            Edit Current Role:
            <br/>
            <select defaultValue="" onChange={this.changeTargetType} className="select select-bordered w-full max-w-xs">
                <option value="">Type of Role</option>
                {Object.values(roleCategoryEnum).map((roleCategory) => {
                    return <option value={roleCategory} key="roleType">{roleCategoryNames(roleCategory)}</option>
                })}
            </select>
            <br/>
            {this.state.typeSelect !== "" && <select
                defaultValue="" onChange={this.editRole} key={this.state.typeSelect} className="select select-bordered w-full max-w-xs">
                <option value="">Select {roleCategoryNames(this.state.typeSelect)}</option>
                {this.state.roles.filter((role) => {return role.category === this.state.typeSelect}).map((role, index) => {
                    return (
                        <option value={role._id} key={this.typeSelect + "_" + index}>{role.name}</option>

                    );
                })}
            </select>}
            <br/>
            {this.state.currentRole !== undefined && this.state.roles.map((role, index) =>{
                if(role === this.state.currentRole) {
                    return <CreateEditRole closeTab={this.onUpdated} key={index} role={this.state.currentRole}/>
                }
            })}
        </div>
    }

}

export default Events;