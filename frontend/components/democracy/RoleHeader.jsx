import React from "react";
import axios from "axios";

class RoleHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gotImage: false };
    }

    async componentDidMount() {
        this.setState({
            gotImage: await this.checkImage("../../files/uploaded/roles/" + this.props.role._id),
        });
    }

    checkImage = async (path) => {
        try {
            const res = await axios.get(path);
            console.log(res.data.slice(0, 15));
            if (res.data.slice(0, 15) !== "<!DOCTYPE html>") {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    mainClick = () => {
        this.props.goToPage(this.props.role.slug);
    };

    render() {
        return (
            <div
                onClick={this.mainClick}
                className="hover:cursor-pointer hover:bg-slate-50 active:bg-slate-200 hover:shadow hover:animate-pingOnce relative border-2 p-2 w-11/12 h-36 sm:h-48 my-2"
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                {!this.props.role.visible && (
                    <>
                        <div className="bg-gray-700 bg-opacity-60 text-white p-0.5 absolute top-0 right-0">
                            Draft
                        </div>
                    </>
                )}
                <div className="flex items-center">
                    <img
                        className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                        src={
                            this.state.gotImage
                                ? "../../files/uploaded/roles/" + this.props.role._id
                                : "../../media/global/JCRLogo.png"
                        }
                    />
                    <div className="font-bold flex-grow text-center">{this.props.role.name}</div>
                </div>
                <div className="mt-2 text-center text-sm">{this.props.role.desc}</div>
            </div>
        );
    }
}

export default RoleHeader;
