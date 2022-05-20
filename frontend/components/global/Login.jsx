import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {username: '', password: ''};
    }

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
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            { this.props.loggedIn !== "waiting" && ( this.props.loggedIn === false?
                <div className="flex">
                    <label> Username:
                    <input
                    name="username" type="text" onChange={this.handleChange}/>
                    </label>
                    <label> Password:
                    <input name="password" type="password" onChange={this.handleChange}/>
                    </label>
                    <div className="flex-grow"/>
                    <button className="mr-1 bg-amber-400 rounded p-1 transition hover:bg-amber-600"  onClick={this.handleLogin}>Login</button>
                    <button className="bg-amber-400 rounded p-1 transition hover:bg-amber-600"  onClick={this.handleRegister}>Register</button>

                </div>
                :
                <div className="flex">
                    <div className="flex-grow"> Hello {this.props.loggedIn}! Welcome back to Butler JCR!</div>
                    <button className="bg-amber-400 rounded p-1 transition hover:bg-amber-600" onClick={this.logOut}>Logout</button>
                </div>
            )


            }


        </div>

    }

}

export default Login;