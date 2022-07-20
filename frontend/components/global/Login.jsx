import React from 'react';
import {login, register, isLoggedIn, logout, resendVerificationEmail} from '../../helpers/loginHelper';
import Loading from "./Loading";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {menuItems} from "./menuItems";
import {Link} from "react-router-dom";

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
        this.state = {username: '', password: '', repeatPassword: "", loginState:loginStateEnum.waiting, tagText: "", open: false};

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
        if (!(/^[A-Z]{4}[0-9]{2}$/i).test(this.state.username)) {
            this.setState({tagText: "Your username should be your CIS code (eg: abcd12)"});
        }
        else if (this.state.password.length < 8) {
            this.setState({tagText: "Password should be at least 8 characters"});
        }
        else if (this.state.password !== this.state.repeatPassword) {
            this.setState({tagText: "Passwords do not match"});
        }
        else {
            const resp = await register(this.state.username, this.state.password);
            console.log(resp)
            if (resp.status === 201) {
                window.location.reload(false);
                console.log('A namee was submitted: ' + this.state.username);
                console.log(resp.data)
            }
            else if (resp.status === 200) {
                this.setState({tagText: resp.data});
            }

        }

    }


    async checkLogin(event) {
        const resp = await isLoggedIn();
        console.log('Welcome ');
        console.log(resp)
    }

    resendVerificationEmail = async () => {
        let success = await resendVerificationEmail();
        if (success) {
            this.setState({tagText: "Your verification email has been sent."})
        }
    }


    async logOut(event) {
        const resp = await logout();

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        // this.setState({username: event.target.value});
    }

    render() {
        let open = (this.state.loginState === loginStateEnum.register ||
            this.state.loginState === loginStateEnum.login || this.state.loginState === loginStateEnum.logout)
        let tag = false
        if (this.state.tagText !== "") {
            tag = <span className="pl-2 flex flex-grow items-center font-normal"><i>{this.state.tagText}</i></span>
        }
        else if (this.state.loginState === loginStateEnum.loggedInNotVerified) {
            tag =<>
                    <span className="pl-2 flex flex-grow items-center font-normal"><i>Your account has not been verified. Please check your university email.</i></span>
                    <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600 text-gray-900 hidden md:block"
                            onClick={this.resendVerificationEmail}>Resend
                    </button>
                    <button className="flex-grow-0 flex-shrink-0 w-16 bg-gray-500 px-1 ml-1 transition hover:bg-gray-700 text-white md:hidden"
                            onClick={this.resendVerificationEmail}>Resend
                    </button>
                </>

        }

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
                                <input className="w-24 ml-2 mr-4 rounded border border-black" name="repeatPassword" type="password" onChange={this.handleChange}/>
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
            <div className="bg-slate-200 h-12 block md:hidden text-grey-900">
                {this.state.loginState === loginStateEnum.waiting && <div className="w-full -translate-y-6"><Loading/></div>}
                {(this.state.loginState === loginStateEnum.notLoggedIn ||
                    this.state.loginState === loginStateEnum.login || this.state.loginState === loginStateEnum.register) &&
                <div className="flex h-full w-full">
                    <span className="pl-2 flex flex-grow items-center font-normal">
                            You are not logged in.
                        </span>
                    <button className={"aspect-square swap swap-rotate " + (this.state.open? "swap-active bg-orange-700 hover:bg-orange-800": "hover:bg-red-800 ")} onClick={() => this.setState({open: !this.state.open})}>
                        <AiOutlineUp className="swap-on text-3xl"></AiOutlineUp>
                        <AiOutlineDown className="swap-off text-3xl"></AiOutlineDown>
                    </button>

                </div>}
                {this.state.loginState === loginStateEnum.loggedIn &&
                <div className="flex h-full w-full">
                    <span className="pl-2 flex flex-grow items-center"> Hello {this.props.loggedIn}! Welcome back to Butler JCR!</span>
                    <button className="flex-grow-0 flex-shrink-0 text-sm w-16 bg-gray-500 px-1 ml-1 transition hover:bg-gray-700 text-white md:hidden"
                            onClick={this.logOut}>Logout
                    </button>
                </div>}
                {this.state.loginState === loginStateEnum.loggedInNotVerified &&
                <div className="flex h-full w-full">
                    <span className="pl-2 flex flex-grow items-center"> Hello {this.props.loggedIn}! Welcome back to Butler JCR!</span>
                    <button className="flex-grow-0 flex-shrink-0 text-sm w-16 bg-gray-500 px-1 ml-1 transition hover:bg-gray-700 text-white md:hidden"
                            onClick={this.logOut}>Logout
                    </button>
                </div>}
                </div>
                <div className="flex md:hidden w-full">
                    {this.state.open && <div className="w-full">
                        {this.state.loginState === loginStateEnum.login && <div className="w-full">
                            <div className="flex h-full w-full bg-gray-300">
                                <div className="flex flex-col pl-2 flex-grow items-center font-normal justify-center">
                                    <div className="flex-grow"/>
                                    <label className="w-full pl-2 items-center font-normal flex"> <div className="w-20">Username:</div>
                                        <input size="5" className="flex-grow max-w-xs min-w-0 ml-2 mr-4 rounded border border-black" name="username" type="text" onChange={this.handleChange}/>
                                    </label>
                                    <div className="flex-grow"/>
                                    <label className="w-full pl-2 items-center font-normal flex"> <div className="w-20">Password:</div>
                                        <input size="5" className="flex-grow max-w-xs min-w-0 ml-2 mr-4 rounded border border-black" name="password" type="password" onChange={this.handleChange}/>
                                    </label>
                                    <div className="flex-grow"/>
                                </div>
                                <div className="flex items-center font-normal">
                                    <button className="w-16 h-16 bg-gray-500  my-1 mx-2 px-2 transition text-white hover:bg-gray-600"
                                            onClick={this.handleLogin}>❯
                                    </button>
                                </div>

                            </div>
                            <div className="flex h-8 w-full">
                                <button className="bg-gray-500 px-2 text-white flex-grow transition hover:bg-gray-600"
                                        onClick={() => console.log("Forgot Password not implemented")}>Forgot?
                                </button>
                                <button className="bg-gray-500 px-2 text-white flex-grow transition hover:bg-gray-600"
                                        onClick={()=> this.setState({loginState: loginStateEnum.notLoggedIn, tagText: ""})}>Back
                                </button>
                            </div>
                        </div>}
                        {this.state.loginState === loginStateEnum.register && <div className="w-full">
                            <div className="flex h-full w-full bg-gray-300">
                                <div className="flex flex-col py-1 pl-2 flex-grow items-center font-normal justify-center">
                                    <div className="flex-grow"/>
                                    <label className="w-full pl-2 py-0.5 items-center font-normal flex"> <div className="w-36">CIS Code:</div>
                                        <input size="5" className="flex-grow max-w-xs min-w-0 mr-4 rounded border border-black" name="username" type="text" onChange={this.handleChange}/>
                                    </label>
                                    <div className="flex-grow"/>
                                    <label className="w-full pl-2 py-0.5 items-center font-normal flex"> <div className="w-36">Password:</div>
                                        <input size="5" className="flex-grow max-w-xs min-w-0 mr-4 rounded border border-black" name="password" type="password" onChange={this.handleChange}/>
                                    </label>
                                    <label className="w-full pl-2 py-0.5 items-center font-normal flex"> <div className="w-36">Confirm Password:</div>
                                        <input size="5" className="flex-grow max-w-xs min-w-0 mr-4 rounded border border-black" name="repeatPassword" type="password" onChange={this.handleChange}/>
                                    </label>
                                    <div className="flex-grow"/>
                                </div>
                                <div className="flex items-center font-normal">
                                    <button className="w-16 h-16 bg-gray-500  my-1 mx-2 px-2 transition text-white hover:bg-gray-600"
                                            onClick={this.handleRegister}>❯
                                    </button>
                                </div>

                            </div>
                            <div className="flex h-8 w-full">
                                <button className="bg-gray-500 px-2 text-white flex-grow transition hover:bg-gray-600"
                                        onClick={()=> this.setState({loginState: loginStateEnum.notLoggedIn, tagText: ""})}>Back
                                </button>
                            </div>
                        </div>}
                        {this.state.loginState === loginStateEnum.notLoggedIn &&
                        <div className="flex h-12 w-full">
                            <button className="bg-gray-300 px-2  flex-grow transition hover:bg-gray-400"
                                    onClick={()=> this.setState({loginState: loginStateEnum.login})}>Login
                            </button>
                            <div className="w-0.5 h-full bg-gray-400"></div>
                            <button className="bg-gray-300 px-2  flex-grow transition hover:bg-gray-400"
                                    onClick={()=> this.setState({loginState: loginStateEnum.register})}>Register
                            </button>
                        </div>}
                    </div>}
                </div>
        {tag !== false
        && <>
            <div className="bg-gray-600 h-8 text-sm hidden md:block text-white">
                <div className="flex h-full w-full">
                    { tag }
                </div>
            </div>
            <div className="bg-gray-600 h-12 text-sm md:hidden text-white">
                <div className="flex h-full w-full">
                    { tag }
                </div>
            </div>
        </>}
    </>}


}

export default Login;
// <button className="bg-amber-400 rounded my-1 mx-2 px-2 transition hover:bg-amber-600"
//         onClick={this.handleRegister}>Register
// </button>