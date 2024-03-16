import React from 'react';
import { getMembersExcel, addMemberList} from '../../helpers/adminHelper';
import { Textarea, Checkbox } from "react-daisyui";
import MemberTable from "./MemberTable";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {memberList: "", expiryYear: "", remove: false};
    }

    getMembers = async () => {
        await getMembersExcel()

    }

    addMemberList = async () => {
        await addMemberList({memberList:this.state.memberList, expiryYear: this.state.expiryYear, remove: this.state.remove})
        window.location.reload(false)
    }


    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.getMembers}>Get All JCR Members</button>
            <div className="font-semibold text-2xl">Add/Remove Members</div>
            <Textarea onChange={(event) => this.setState({memberList:event.target.value})} placeholder="CIS codes"></Textarea>
            <div>Add all the JCR Members. CIS Codes separated by line breaks</div>
            <label> Year of membership Expiry (YY):
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noTickets"
                       type="number" onChange={(event) => this.setState({expiryYear:parseInt(event.target.value)})}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>
            <div className="flex">
                <Checkbox onChange={() => this.setState({remove:!this.state.remove})} className="mr-2"></Checkbox>
                Check if you want to remove, rather than add these names.
            </div>
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.addMemberList}>Add Names</button>
            <MemberTable/>
        </div>
    }

}

export default Members;