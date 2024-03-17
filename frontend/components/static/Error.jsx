import React from "react";

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex text-center flex-col w-full justify-center place-items-center">
                <div className="my-4 text-4xl font-semibold">Oops! Something went wrong! )-;</div>
                <img
                    className="w-full max-w-sm object-contain my-4 mx-8 px-2"
                    src="media/global/err.jpg"
                />
                <div className=" my-4 text-lg">
                    Please continue as normal, and contact the webmasters if this occurs again.
                </div>
            </div>
        );
    }
}

export default Error;
