import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import UserEvents from './UserEvents';
import { Outlet } from 'react-router-dom';
class Students extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Outlet/>
        // return <div>Beans</div>
    }

}

export default Students;