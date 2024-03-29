import React from "react";

import { useNavigate, useParams } from "react-router-dom";
// import MiniEditor from "../global/MiniEditor";
import { getUser } from "../../helpers/userHelper";

// TODO: Review this file, as it currently looks incomplete
class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: undefined };
    }

    async componentDidMount() {
        let user = getUser();
        this.setState({ user: user });
    }

    render() {
        return (
            <div className="px-4 py-4">
                <div className="font-semibold text-4xl">Account Settings</div>
                <div className="font-semibold text-2xl pt-2">Display Name</div>
                <div className="">
                    Enter a display name. This can be your full name or a nickname, but please be
                    aware this is public and associated with your CIS code.
                </div>
                {/*<MiniEditor text={member.username} saveText={(text) => this.saveText(text, index, "username")}/>*/}
                <button
                    className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.pay}
                >
                    Pay Levy
                </button>
            </div>
        );
    }
}

const Account = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <AccountComponent {...props} params={params} navigate={navigate} />;
};

export default Account;
