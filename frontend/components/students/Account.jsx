import React from "react";

import {payLevy} from "../../helpers/financeHelper";
import {useNavigate, useParams} from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import Loading from "../global/Loading";
import date from 'date-and-time';
import {getMembershipStatus} from "../../helpers/studentHelper";
import MiniEditor from "../global/MiniEditor";
import {getUser} from "../../helpers/userHelper";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: undefined}
    }

    async componentDidMount() {
        let user = getUser()
        this.setState({user: user})
    }



    render() {
        return <div className="px-4 py-4">
            <div className="font-semibold text-4xl">Account Settings</div>
            <div className="font-semibold text-2xl pt-2">Display Name</div>
            <div className="">Enter a display name. This can be your full name or a nickname, but please be aware this is public and associated with your CIS code.</div>
            <MiniEditor text={member.username} saveText={(text) => this.saveText(text, index, "username")}/>
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.pay}>Pay Levy</button>


        </div>

    }

}

export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <Account {...props} params={params} navigate={navigate} />;
}