import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {username: '', password: ''};
    }

    async handleLogin(event) {
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
        return <div>
                <label> Username:
                    <input
                        name="username" type="text" onChange={this.handleChange}/>
                </label>
                <label> Password:
                    <input name="password" type="password" onChange={this.handleChange}/>
                </label>
                <button onClick={this.handleLogin}>Submit</button>
                <button onClick={this.checkLogin}>Check if already in</button>
                <button onClick={this.logOut}>Logout</button>

        </div>

    }

}

export default Register;