import React from "react";
import Editable from "../global/Editable";
import EditablePage from "../global/EditablePage";

class Gym extends EditablePage {
    constructor(props) {
        super(props);
        this.state = { editables: "waiting", editor: false, editing: false, page: "gym" };
    }

    render() {
        return this.renderOnLoad(
            <div className="p-4">
                <div className="text-4xl font-bold pb-4">Gym</div>
                <Editable
                    updateEditable={this.updateEditable}
                    className="w-28 h-16"
                    page={this.state.page}
                    editables={this.state.editables}
                    name="description"
                    editing={this.state.editing}
                />
            </div>,
        );
    }
}

export default Gym;
