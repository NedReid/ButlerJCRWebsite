import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import {getUserByResetToken, submitNewPassword} from "../../helpers/loginHelper";

class ResetPasswordComponent extends React.Component {
    constructor(props) {

        super(props);
        let token = this.props.params["id"]
        this.state = {user: undefined, password: "", password2: "", token: token, errorText: ""};
    }

    async componentDidMount() {
        const user = await getUserByResetToken(this.state.token)
        if (user === undefined) {
            this.props.navigate("/oh-no", {replace: true});
        }
        else {
            this.setState({user: user});
        }
    }

    handleChange = (event, type) => {
        this.state.post[type] = event.target.value;
        console.log(this.state.post)
    }

    handleBoolChange= (event, type) => {
        this.state.post[type] = (event.target.value === 'true');
        console.log(this.state.post)
    }



    handlePage = (page) => {
        this.state.post.page = page;
    }


    submitButton = async () => {
        if (this.state.password.length < 8) {
            this.setState({errorText: "Password should be at least 8 characters"});
            return
        } else if (this.state.password !== this.state.password2) {
            this.setState({errorText: "Passwords do not match"});
            return
        }
        const resp = await submitNewPassword(this.state.token, this.state.password);
        if (resp.status === 201) {
            this.props.navigate("/", {replace: true});
            window.location.reload(false);
        }
        else if (resp.status === 200) {
            this.setState({errorText: resp.data});
        }


    }


    render() {
        console.log("RENDERING", this.state.post)
        if (this.state.user !== undefined) {
            return <div className="p-4">
                <div className="my-4 text-3xl font-semibold">Reset password for {this.state.user.username}</div>
                <div className="my-2"><label> Password:
                    <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                           name="password" type="password" defaultValue={this.state.password}
                           onChange={(event) => this.setState({password: event.target.value})}/>
                </label></div>
                <div className="my-2"><label> Confirm Password:
                    <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                           name="password2" type="password" defaultValue={this.state.password2}
                           onChange={(event) => this.setState({password2: event.target.value})}/>
                </label></div>
                <button className="my-2 bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Change Password</button>
                <div className="italic font-semibold">{this.state.errorText}</div>

            </div>
        } else {
            return <Loading></Loading>
        }
    }

}


const ResetPassword = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <ResetPasswordComponent {...props} params={params} navigate={navigate} />;
}
export default ResetPassword