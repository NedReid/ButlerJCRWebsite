import React from "react";

import {payLevy} from "../../helpers/financeHelper";
import {useNavigate, useParams} from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';

class PayLevy extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {stripe: undefined}
    }

    // async componentDidMount() {
    //     await this.setState({})
    //     console.log(this.state.stripe)
    // }
    async pay(){
        const stripe = await loadStripe("pk_test_51MldJRG0Zj3t7sfX8NTaDtew4jOW7OZVbyz9CA1jhDMqqeyp2JB0UXCaart3bKxW60UPERbxKcrZE7HQPl9rUcSA00zbSuEUQV")
        const session = await payLevy()
        console.log(session)
        const result = await stripe.redirectToCheckout({sessionId: session.id})
    }



    render() {
        console.log("RENDERING2")
        return <div className="px-4 py-4">
            <div className="font-semibold text-4xl">Pay your JCR Levy</div>
            <div className="py-4">To pay your JCR Levy, simply click the button below</div>
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.pay}>Pay Levy</button>
        </div>
    }

}

export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <PayLevy {...props} params={params} navigate={navigate} />;
}