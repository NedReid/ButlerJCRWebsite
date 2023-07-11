import React, {useCallback} from 'react';
import {getSSCHeaders} from "../../helpers/getInvolvedHelper";
import {useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import {tailwindParse} from "../../helpers/tailwindParse";
import {SSCEnum} from "../../models/SSCEnum";
import { AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";

class SSCHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gotImage: false, editor: false, showPencil: false, miniHover: false}

    }

    async componentDidMount() {
        this.setState({gotImage: await this.checkImage("../../files/sscLogos/" + this.props.ssc._id)})
        this.setState({editor: this.props.username !== "waiting" &&  this.props.username !== false && this.props.ssc.editors.includes(this.props.username)})
    }

    checkImage = async (path) => {
        try {
            const res = await axios.get(path);
            console.log(res.data.slice(0,15))
            if (res.data.slice(0,15) !== "<!DOCTYPE html>") {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err)
            return false;
        }

    }

    handleMouseOver = () => {
        this.setState({showPencil: true});
    };

    handleMouseOut = () => {
        this.setState({showPencil: false});
    };

    handleMouseMiniOver = () => {
        this.setState({miniHover: true});
    };

    handleMouseMiniOut = () => {
        this.setState({miniHover: false});
    };

    mainClick = () => {
        if (!this.state.miniHover) {
            this.props.goToPage(this.props.ssc.slug);
        }
    }

    render() {
        return <div onClick={this.mainClick}  className="hover:cursor-pointer hover:bg-slate-50 active:bg-slate-200 hover:shadow hover:animate-pingOnce relative border-2 p-2 w-11/12 h-36 sm:h-48 my-2" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
            {this.state.editor && this.state.showPencil && <>
                <button onClick={() => this.props.editPage(this.props.ssc._id)}  className="btn btn-circle absolute top-0 right-0 m-2" onMouseOver={this.handleMouseMiniOver} onMouseOut={this.handleMouseMiniOut}>
                    <AiOutlineEdit className="text-2xl"/>
                </button>
            </>
            }
            <div className="flex items-center">
                <img className="w-16 h-16 sm:w-24 sm:h-24 object-contain" src={this.state.gotImage? "../../files/sscLogos/" + this.props.ssc._id : "../../media/global/JCRLogo.png"} />
                <div className="font-bold flex-grow text-center">{this.props.ssc.name}</div>
            </div>
            <div className="mt-2 text-center text-sm">{this.props.ssc.desc}</div>

        </div>

    }

}

export default SSCHeader;

