import React, {useEffect, Suspense} from 'react';
import {Button, Modal} from "react-daisyui";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {AiOutlineCheck} from "react-icons/all";

class CookiesModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {open: (Cookies.get('seenNotice') === undefined)}
    }

    accept = () => {
        Cookies.set('seenNotice', 'true', {expires: 365})
        this.setState({open: false})
    }



    render() {
        if (this.state.open) {
            return <div className="bg-gray-700 text-white flex xs:h-24 sm:h-20 md:h-16">
                <div className="p-2 grow text-sm"><div>We use cookies to provide core functionality.
                    Please read our <Link replace to="/cookies" className="underline hover:brightness-75">Cookies Policy</Link> for more information.</div>
                    <div className="mt-0.5">This website is in <span className="font-semibold">Beta</span>. If you encounter any issues, please use our <Link replace to="/feedback" className="underline hover:brightness-75">website feedback form</Link>.</div>

                </div>
                <button aria-label="Dismiss cookies notification" className="text-4xl md:text-3xl px-2 xs:px-0 text-center xs:aspect-square xs:h-24 xs:w-24 sm:h-20 sm:w-20 md:h-16 md:w-16 font-bold bg-gray-800 hover:bg-gray-900" onClick={this.accept}><AiOutlineCheck className="mx-auto"/></button>
            </div>


        }
    }
}

export default CookiesModal;
