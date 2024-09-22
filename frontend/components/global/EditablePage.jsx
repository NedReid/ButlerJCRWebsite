import React from "react";
import { getPageEditables, updatePageEditables } from "../../helpers/staticHelper";
import Loading from "./Loading";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

class EditablePage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let res = await getPageEditables(this.state.page);
        await this.setState({ editables: res.editables, editor: res.editor });
    }

    updateEditable = (editable) => {
        let initEd = this.state.editables.findIndex((ed) => ed.name === editable.name);

        if (initEd >= 0) {
            this.state.editables[initEd] = editable;
        } else {
            this.state.editables.push(editable);
        }
    };

    onChange = async () => {
        if (this.state.editing) {
            await updatePageEditables(this.state.page, this.state.editables);
        }
        this.setState({ editing: !this.state.editing });
    };

    renderOnLoad(component) {
        if (this.state.editables !== "waiting") {
            return (
                <div className={"relative"}>
                    {this.state.editor && (
                        <div className="bg-slate-500 text-white w-full h-12 pl-2 flex">
                            <div className="w-full h-12 flex flex-grow items-center">
                                You {this.state.editing ? "are editing" : "can edit"} this page.
                            </div>
                            <button
                                className={
                                    "swap swap-rotate flex-grow-0 flex-shrink-0 w-16 h-12 bg-slate-600 px-1 ml-1 transition hover:bg-slate-700 " +
                                    (this.state.editing ? "swap-active" : "")
                                }
                                onClick={this.onChange}
                            >
                                <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                                <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                            </button>
                        </div>
                    )}
                    {component}
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

export default EditablePage;
