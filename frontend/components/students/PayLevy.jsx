import React from "react";

import { payLevy } from "../../helpers/financeHelper";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../global/Loading";
import date from "date-and-time";
import { getMembershipStatus } from "../../helpers/studentHelper";

class PayLevyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { membershipStatus: undefined };
    }

    async componentDidMount() {
        let membershipStatus = await getMembershipStatus(this.props.username);
        await this.setState({ membershipStatus: membershipStatus });
        // console.log(this.state.stripe)
    }
    async pay() {
        const stripe = await loadStripe(
            "pk_test_51MldJRG0Zj3t7sfX8NTaDtew4jOW7OZVbyz9CA1jhDMqqeyp2JB0UXCaart3bKxW60UPERbxKcrZE7HQPl9rUcSA00zbSuEUQV",
        );
        const session = await payLevy();
        console.log(session);
        await stripe.redirectToCheckout({ sessionId: session.id });
    }

    render() {
        console.log("RENDERING2");
        console.log(this.state.membershipStatus);
        return (
            <div className="px-4 py-4">
                {this.state.membershipStatus === undefined ? (
                    <Loading />
                ) : this.state.membershipStatus === false ? (
                    <>
                        <div className="font-semibold text-4xl">Pay your JCR Levy</div>
                        <div className="py-4">
                            To pay your JCR Levy, simply click the button below
                        </div>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={this.pay}
                        >
                            Pay Levy
                        </button>
                    </>
                ) : (
                    <>
                        <div className="font-semibold text-4xl">Your JCR Levy</div>
                        <div className="py-4">You have paid your JCR Levy</div>
                        <div className="py-4">Username: {this.state.membershipStatus.username}</div>
                        <div className="py-4">
                            Expiry Date:{" "}
                            {date.format(new Date(this.state.membershipStatus.expiry), "DD/MM/YY")}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

const PayLevy = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <PayLevyComponent {...props} params={params} navigate={navigate} />;
};

export default PayLevy;
