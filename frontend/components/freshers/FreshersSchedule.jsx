import React from "react";
import Editable from "../global/Editable";
import { Link } from "react-router-dom";
import EditablePage from "../global/EditablePage";

class FreshersSchedule extends EditablePage {
    constructor(props) {
        super(props);
        this.state = { editables: "waiting", editor: false, editing: false, page: "freshers" };
    }

    render() {
        return this.renderOnLoad(
            <div className="p-4">
                <div className="text-4xl font-semibold">Freshers Week Schedule</div>
                <div className="text-lg mt-1">
                    Follow this page for up-to-date information on all our Freshers Week activities!
                    For a full list of all our events from {`Freshers'`} Week and beyond, you can
                    also visit our{" "}
                    <Link className="link text-blue-700 hover:text-blue-800" to="/calendar">
                        JCR Calendar!
                    </Link>
                </div>
                <div className="mt-4 py-2 md:py-0 md:pr-2">
                    <Editable
                        updateEditable={this.updateEditable}
                        className="h-8"
                        page={this.state.page}
                        editables={this.state.editables}
                        name="schedule"
                        editing={this.state.editing}
                    />
                </div>
            </div>,
        );
    }
}

export default FreshersSchedule;
