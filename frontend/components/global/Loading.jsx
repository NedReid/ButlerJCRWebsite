import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <div className="flex">
                <div className="flex-grow pt-8 justify-center flex">
                    <AiOutlineLoading3Quarters className="animate-spin align-middle justify-self-center" />
                </div>
            </div>
        );
    }
}

export default Loading;
