import React from 'react';
import {login, register, isLoggedIn, logout} from '../../helpers/loginHelper';
import UserEvents from './UserEvents';
class Students extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <><UserEvents/></>
        // return <div>Beans</div>
    }

}

export default Students;