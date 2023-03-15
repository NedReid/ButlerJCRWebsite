import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import SSCs from './SSCs';
import Events from './Events';
import PagePerms from "./PagePerms";
import AdminPerms from "./AdminPerms";
import Roles from "./Roles";
import Officers from "./Officers";
import Meetings from "./Meetings";
import Motions from "./Motions";
import Candidates from "./Candidates";
import PostCategories from "./PostCategories";
import Products from "./Products";
class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            {this.props.admin.events && <Events/>}
            {this.props.admin.SSCs && <SSCs/>}
            {this.props.admin.pagePerms && <PagePerms/>}
            {this.props.admin.adminPerms && <AdminPerms/>}
            {this.props.admin.democracy && <Roles/>}
            {this.props.admin.democracy && <Officers/>}
            {this.props.admin.democracy && <Meetings/>}
            {this.props.admin.democracy && <Motions/>}
            {this.props.admin.democracy && <Candidates/>}
            {this.props.admin.postCategories && <PostCategories/>}
            {this.props.admin.finance && <Products/>}
        </>

    }

}

export default Admin;