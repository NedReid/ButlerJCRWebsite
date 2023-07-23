import React from 'react';
import { getFolderAddresses } from "../../helpers/staticHelper";
import {Table} from "react-daisyui";

class Error extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="flex text-center flex-col w-full justify-center place-items-center">
            <div className="my-4 text-4xl font-semibold">Butler JCR Cookies Policy</div>
            <img className="w-full max-w-xs object-contain my-4 mx-8 px-2" src="media/global/cookie.jpg"/>
            <div className=" my-4">Butler JCR believes that cookies are tasty. 😋 However there is another type of cookie:
            The type that we store in your computer!</div>
            <div>BEFORE YOU SMASH YOUR COMPUTER OPEN!!! These cookies are <span className="font-bold">digital</span>, and you cannot eat them.
            They are made to store useful bits and bobs of data, that are essential to your browsing experience. These first-party cookies are used to enable
            functionality to our website, such as our login and account system.</div>
            <div>If you want to refuse all cookies, you can set your browser settings to refuse them, but please note that this may negatively effect your browsing experience.</div>
            <div className="my-4 text-2xl font-semibold">What cookies are being stored</div>
            <div className="my-4 text-lg font-semibold">Essential Cookies:</div>
            <Table>
                <Table.Head>
                    <div>Cookie Name</div>
                    <div>Use</div>
                    <div>Time Stored</div>
                </Table.Head>

                <Table.Body>
                    <Table.Row>
                        <div>loginToken</div>
                        <div className="whitespace-normal">a unique login token, to verify a user is logged into their account on the site. Only used when a user is logged in.</div>
                        <div>28 Days</div>
                    </Table.Row>

                    <Table.Row>
                        <div>seenNotice</div>
                        <div className="whitespace-normal">To verify a user has seen the cookies notice when first entering the site</div>
                        <div>12 Months</div>
                    </Table.Row>
                </Table.Body>

            </Table>

        </div>

    }

}

export default Error;