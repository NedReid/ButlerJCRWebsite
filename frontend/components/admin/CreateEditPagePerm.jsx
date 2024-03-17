import React from "react";
import { updatePagePerms, createPagePerms } from "../../helpers/adminHelper";
import pagePermModel from "../../models/pagePermModel";

class CreateEditPagePerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagePerm: new pagePermModel() };
        if (props.pagePerm !== undefined) {
            this.state = { pagePerm: props.pagePerm };
        }
    }

    handleChange = (event, type) => {
        this.state.pagePerm[type] = event.target.value;
        console.log(this.state.pagePerm);
    };

    submitButton = async () => {
        if (this.props.pagePerm !== undefined) {
            console.log(this.state.pagePerm);
            await updatePagePerms(this.state.pagePerm);
        } else {
            await createPagePerms(this.state.pagePerm);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.pagePerm.editors.length) {
            this.state.pagePerm.editors.push("");
        }
        while (num < this.state.pagePerm.editors.length) {
            this.state.pagePerm.editors.pop();
        }
        this.forceUpdate();
    };

    updateEditor = (event, ind) => {
        this.state.pagePerm.editors[ind] = event.target.value;
    };

    render() {
        console.log("RENDERING");
        return (
            <>
                {" "}
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <label>
                        {" "}
                        Page name:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="name"
                            type="text"
                            defaultValue={this.state.pagePerm.page}
                            onChange={(event) => this.handleChange(event, "page")}
                        />
                    </label>

                    <label>
                        {" "}
                        Number of Editors:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="noEditors"
                            type="number"
                            defaultValue={this.state.pagePerm.editors.length}
                            onChange={this.setArrayLength}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </label>
                    {this.state.pagePerm.editors.map((opt, index) => {
                        return (
                            <label className="flex" key={index}>
                                {" "}
                                Editor {index + 1} CIS Code:
                                <input
                                    className=" mx-2 mb-2 rounded border-2 border-slate-500 flex-grow"
                                    name="questionText"
                                    type="text"
                                    defaultValue={this.state.pagePerm.editors[index]}
                                    key={this.state.pagePerm._id + "editor" + index}
                                    onChange={(event) => this.updateEditor(event, index)}
                                />
                            </label>
                        );
                    })}
                </div>
                <button
                    className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.submitButton}
                >
                    Save Perms
                </button>
            </>
        );
    }
}

export default CreateEditPagePerm;
