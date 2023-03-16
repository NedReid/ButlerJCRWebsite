import React from 'react';
import { getRoles, getMembersExcel } from '../../helpers/adminHelper';
import CreateEditRole from './CreateEditRole';
import {roleCategoryEnum, roleCategoryNames, meetingEnum, methodEnum} from "../../models/roles/roleEnums";

class Members extends React.Component {
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



    getMembers = async () => {
        await getMembersExcel()

    }



    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.getMembers}>Get All JCR Members</button>

        </div>
    }

}

export default Members;