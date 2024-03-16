import React from 'react';
import { Outlet } from 'react-router-dom';
class Students extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Outlet/>
    }

}

export default Students;