import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import Loading from "./Loading";

const loginStateEnum = {
    notLoggedIn: 0,
    login: 1,
    register: 2,
    loggedInNotVerified: 3,
    loggedIn: 4,
    logout: 5,
    registered: 6,
    waiting: 7
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {username: '', password: '', repeatPassword: "", loginState:loginStateEnum.waiting, tagText: ""};

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.loggedIn === "waiting") {
            if (this.props.loggedIn !== false && this.props.loggedIn !== "waiting") {
                if (this.props.verified !== false) {
                    this.setState({loginState: loginStateEnum.loggedIn});
                }
                else {
                    this.setState({loginState: loginStateEnum.loggedInNotVerified})
                }
            }
            else if (this.props.loggedIn === false) {
                this.setState({loginState: loginStateEnum.notLoggedIn});
            }
        }
    }

    // async updateLoginState(newState=undefined) {
    //     if(newState !== undefined) {
    //
    //     }
    //     else {
    //         if this.props.
    //     }
    // }

    async handleLogin(event) {
        const resp = await login(this.state.username, this.state.password);
        console.log('A namee was submitted: ' + this.state.username);
        console.log(resp.username)
    }

    async handleRegister(event) {
        const resp = await register(this.state.username, this.state.password);
        console.log('A namee was submitted: ' + this.state.username);
        console.log(resp.username)
    }


    async checkLogin(event) {
        const resp = await isLoggedIn();
        console.log('Welcome ');
        console.log(resp)
    }

    async logOut(event) {
        const resp = await logout();

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        // this.setState({username: event.target.value});
    }

    render() {
            return <><div className="bg-slate-200 h-8 text-sm hidden md:block text-grey-900">
                {this.state.loginState === loginStateEnum.waiting && <div className="w-full -translate-y-6"><Loading/></div>}
                {this.state.loginState === loginStateEnum.login &&
                    <div className="flex h-full w-full">
                        <span className="pl-2 flex flex-grow items-center font-normal">
                            <label> Username:
                                <input className="w-28 ml-2 mr-4 rounded border border-black" name="username" type="text" onChange={this.handleChange}/>
                            </label>
                            <label> Password:
                                <input className="w-28 ml-2 mr-4 rounded border border-black" name="password" type="password" onChange={this.handleChange}/>
                            </label>
                            <div className="flex-grow"/>
                        </span>
                        <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                                onClick={this.handleLogin}>Login
                        </button>
                        <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                                onClick={() => console.log("Forgot Password not implemented")}>Forgot?
                        </button>
                        <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                                onClick={()=> this.setState({loginState: loginStateEnum.notLoggedIn})}>Back
                        </button>
                    </div>}
                {this.state.loginState === loginStateEnum.register &&
                <div className="flex h-full w-full">
                        <span className="pl-2 flex flex-grow items-center font-normal">
                            <label> CIS Code:
                                <input className="w-24 ml-2 mr-4 rounded border border-black" name="username" type="text" onChange={this.handleChange}/>
                            </label>
                            <label> Password:
                                <input className="w-24 ml-2 mr-4 rounded border border-black" name="password" type="password" onChange={this.handleChange}/>
                            </label>
                            <label> Confirm Password:
                                <input className="w-24 ml-2 mr-4 rounded border border-black" name="password" type="password" onChange={this.handleChange}/>
                            </label>
                            <div className="flex-grow"/>
                        </span>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                            onClick={this.handleRegister}>Register
                    </button>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                            onClick={()=> this.setState({loginState: loginStateEnum.notLoggedIn})}>Back
                    </button>
                </div>}
                {this.state.loginState === loginStateEnum.notLoggedIn &&
                <div className="flex h-full w-full">
                        <span className="pl-2 flex flex-grow items-center font-normal">
                            You are not logged in.
                        </span>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                            onClick={()=> this.setState({loginState: loginStateEnum.login})}>Login
                    </button>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                            onClick={()=> this.setState({loginState: loginStateEnum.register})}>Register
                    </button>
                </div>}
                {this.state.loginState === loginStateEnum.loggedIn &&
                <div className="flex h-full w-full">
                        <span className="pl-2 flex flex-grow items-center"> Hello {this.props.loggedIn}! Welcome back to Butler JCR!</span>
                        <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                                onClick={this.logOut}>Logout
                        </button>
                    </div>}
                {this.state.loginState === loginStateEnum.loggedInNotVerified &&
                <div className="flex h-full w-full">
                    <span className="pl-2 flex flex-grow items-center"> Hello {this.props.loggedIn}! Welcome back to Butler JCR!</span>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                            onClick={this.logOut}>Logout
                    </button>
                </div>}
            </div>
        {(this.state.tagText === "" || this.state.loginState === loginStateEnum.loggedInNotVerified)
        && <div className="bg-gray-600 h-8 text-sm hidden md:block text-white">
            <div className="flex h-full w-full">
                {this.state.loginState === loginStateEnum.loggedInNotVerified && <><span className="pl-2 flex flex-grow items-center font-normal">
                    <i>Your account has not been verified. Please check your university email.</i>
                </span>
                <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
                        onClick={this.resendEmail}>Resend
                </button>
                </>}
            </div>
        </div>}
        </>}

}

export default Login;
// <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
//         onClick={this.handleRegister}>Register
// </button>