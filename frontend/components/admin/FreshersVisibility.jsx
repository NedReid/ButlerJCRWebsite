import React from "react";
import { getKeyValue, setKeyValue } from "../../helpers/adminHelper";
import Loading from "../global/Loading";

class FreshersVisibility extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visibility: undefined, complete: false };
    }

    async componentDidMount() {
        const visibility = await getKeyValue("freshersVisibility");
        this.setState({ visibility: visibility });
        console.log(visibility);
    }

    updateVisibility = async (event) => {
        this.setState({ visibility: event.target.value, complete: false });
    };

    submitButton = async () => {
        await setKeyValue("freshersVisibility", this.state.visibility);
        this.setState({ complete: true });
    };

    render() {
        if (this.state.visibility !== undefined) {
            return (
                <div className="my-2 p-2 rounded border-2 border-amber-500">
                    Edit Freshers Page visibility:
                    <br />
                    <select
                        defaultValue={this.state.visibility}
                        onChange={this.updateVisibility}
                        key="fVis"
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value={"visible"} key={"fVis_visible"}>
                            Visible to all
                        </option>
                        <option value={"invisible"} key={"fVis_invisible"}>
                            Invisible to all
                        </option>
                        <option value={"preview"} key={"fVis_preview"}>
                            Preview (Visible to you)
                        </option>
                    </select>
                    <br />
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={this.submitButton}
                    >
                        Update Visibility
                    </button>
                    {this.state.complete && (
                        <div className="italic text-sm">Updated to {this.state.visibility}</div>
                    )}
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

export default FreshersVisibility;
