import React from 'react';
import {menuItems} from "./menuItems";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Swap } from "react-daisyui";
import { MdOutlineClear, MdOutlineMenu } from "react-icons/md"
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, subOpen: new Array(menuItems.length).fill(false)}
    }
    render() {
        return <>
                <div className="w-full h-4 align bg-red-800"/>
                <div className="text-white z-16 p-4 bg-red-700 flex md:block">
                    © Josephine Butler JCR, 2022
                    <br/>
                    <a className="hover:underline" href="https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/5192013">Registered Charity No. 1197721</a>
                </div>
            </>
    }
}

export default Footer;