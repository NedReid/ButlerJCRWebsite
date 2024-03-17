import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyLogin } from "../../helpers/loginHelper";

class VerifyLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        let token = this.props.params["id"];
        if (token === "") {
            this.props.navigate("/", { replace: true });
            window.location.reload(false);
        }
        this.state = { token: token, errorText: "" };
    }

    submitButton = async () => {
        console.log("verifying");
        const resp = await verifyLogin(this.state.token);
        if (resp.status === 204) {
            this.setState({
                errorText:
                    "It seems you have already verified your account. If this is not the case, please contact the webmaster.",
            });
        }
        if (resp.status === 200) {
            this.props.navigate("/", { replace: true });
            window.location.reload();
        }
    };

    render() {
        return (
            <div className="p-4">
                <div className="my-4 text-3xl font-semibold">Verify Account</div>
                <div>Click the button below to verify your account</div>
                <button
                    className="my-2 bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.submitButton}
                >
                    Verify Account
                </button>
                <div className="italic font-semibold">{this.state.errorText}</div>
            </div>
        );
    }
}

const VerifyLogin = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <VerifyLoginComponent {...props} params={params} navigate={navigate} />;
};

export default VerifyLogin;
