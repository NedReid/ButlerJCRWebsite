import React from 'react';
import {Card} from 'react-daisyui';

class WhosWhoBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="m-4 border-slate-400 text-center justify-items-center p-2 h-44 w-88 border-2 rounded-lg drop-shadow-xl bg-white">
            <div className="grid grid-cols-2">
                <img className="my-auto w-40 h-40 object-contain" src={"/media/whoswho/" + this.props.photo}/>
                <div className="text-center justify-items-center w-40 pl-2">
                    <div className="text-lg">{this.props.name} <span className="text-sm">({this.props.pronouns})</span></div>
                    <div className="">{this.props.role}</div>
                    <a className="break-all text-blue-700 underline text-sm" href={"mailto:" + this.props.email}>{this.props.email}</a>
                </div>
            </div>


        </div>

    }

}

export default WhosWhoBlock;