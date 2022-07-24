import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import SSCs from './SSCs';
import Events from './Events';
import PagePerms from "./PagePerms";

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            {this.props.admin.events && <Events/>}
            {this.props.admin.SSCs && <SSCs/>}
            {this.props.admin.pagePerms && <PagePerms/>}
        </>

    }

}

export default Admin;