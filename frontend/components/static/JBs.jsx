import React from "react";
import Editable from "../global/Editable";
import EditablePage from "../global/EditablePage";

class JBs extends EditablePage {
    constructor(props) {
        super(props);
        this.state = { editables: "waiting", editor: false, editing: false, page: "jbs" };
    }

    render() {
        return this.renderOnLoad(
            <div className="p-4">
                <div className="text-5xl font-bold">{`JB's`}</div>
                <div className="max-w-xl">
                    <Editable
                        updateEditable={this.updateEditable}
                        page={this.state.page}
                        editables={this.state.editables}
                        name="desc"
                        editing={this.state.editing}
                    />
                </div>
                <div className="text-4xl font-semibold py-4">Opening Times:</div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="py-2 md:py-0 md:pr-2">
                        <Editable
                            updateEditable={this.updateEditable}
                            className="h-8"
                            page={this.state.page}
                            editables={this.state.editables}
                            name="bar"
                            editing={this.state.editing}
                        />
                    </div>
                    <div className="py-2 md:py-0 md:pr-2">
                        <Editable
                            updateEditable={this.updateEditable}
                            className="h-8"
                            page={this.state.page}
                            editables={this.state.editables}
                            name="kitchen"
                            editing={this.state.editing}
                        />
                    </div>
                    <div className="py-2 md:py-0 md:pr-2">
                        <Editable
                            updateEditable={this.updateEditable}
                            className="h-8"
                            page={this.state.page}
                            editables={this.state.editables}
                            name="coffee"
                            editing={this.state.editing}
                        />
                    </div>
                </div>
            </div>,
        );
    }
}

export default JBs;
