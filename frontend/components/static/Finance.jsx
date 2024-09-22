import React from "react";
import Editable from "../global/Editable";
import EditablePage from "../global/EditablePage";

class Finance extends EditablePage {
    constructor(props) {
        super(props);
        this.state = { editables: "waiting", editor: false, editing: false, page: "finance" };
    }

    render() {
        return this.renderOnLoad(
            <div className="p-4">
                <div className="text-4xl font-bold">JCR Finance</div>
                <Editable
                    updateEditable={this.updateEditable}
                    className="w-28 h-16"
                    page={this.state.page}
                    editables={this.state.editables}
                    name="desc"
                    editing={this.state.editing}
                />
                <div className="text-3xl font-semibold">Who to contact?</div>
                <Editable
                    updateEditable={this.updateEditable}
                    className="w-32 h-8"
                    page={this.state.page}
                    editables={this.state.editables}
                    name="contact"
                    editing={this.state.editing}
                />
            </div>,
        );
    }
}

export default Finance;
