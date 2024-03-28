import React from "react";
import { menuItems } from "./menuItems";
import { Link } from "react-router-dom";
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, subOpen: new Array(menuItems.length).fill(false) };
    }
    render() {
        return (
            <>
                <div className="w-full h-4 align bg-red-800" />
                <div className="flex text-white z-16 p-4 bg-red-700">
                    <div className="pr-2 grow">
                        © Josephine Butler JCR, {new Date().getFullYear()}
                        <br />
                        <div className="mt-2">
                            <a
                                className="hover:underline"
                                href="https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/5192013"
                            >
                                Registered Charity No. 1197721
                            </a>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>
                            <Link to="/cookies" className="underline hover:brightness-75">
                                Cookies Policy
                            </Link>
                        </div>
                        <div className="mt-2">
                            <Link to="/feedback" className="underline hover:brightness-75">
                                Website Feedback
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;
