import React from 'react';
import {getPageEditables, updatePageEditables} from "../../helpers/staticHelper";
import Loading from "../global/Loading";
import Editable from "../global/Editable";
import {AiFillEdit, AiFillSave} from "react-icons/ai";

class JBs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editables: "waiting", editor: false, editing: false, page: "jbs"}

    }

    async componentDidMount() {
        let res = await getPageEditables(this.state.page)
        console.log(res)
        await this.setState({editables: res.editables, editor: res.editor})
    }

    updateEditable = (editable) => {
        console.log(this.state)
        console.log("BEANS", this.state.editables)
        let initEd = this.state.editables.findIndex(ed => ed.name === editable.name)

        if (initEd >= 0) {
            this.state.editables[initEd] = editable
        }
        else {
            this.state.editables.push(editable);
        }
    }

    onChange = async () => {
        if (this.state.editing) {
            await updatePageEditables(this.state.page, this.state.editables)
        }
        this.setState({editing: !this.state.editing})
    }


    render() {
        if (this.state.editables !== "waiting") {
            return <div className="p-4 relative">
                {this.state.editor && <button className={"btn btn-circle absolute top-0 right-0 m-2 swap swap-rotate " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                    <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                    <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                </button>}
                <div className="text-5xl font-bold">JB's</div>
                <div className="max-w-xl">
                    <Editable updateEditable={this.updateEditable} page={this.state.page} editables={this.state.editables} name="desc" editing={this.state.editing}/>
                </div>
                <div className="text-4xl font-semibold py-4">Opening Times:</div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="py-2 md:py-0 md:pr-2">
                        <div className="text-2xl">Bar</div>
                        <Editable updateEditable={this.updateEditable}  className="h-8" page={this.state.page} editables={this.state.editables} name="bar" editing={this.state.editing}/>
                    </div>
                    <div className="py-2 md:py-0 md:pr-2">
                        <div className="text-2xl">Kitchen</div>
                        <Editable updateEditable={this.updateEditable}  className="h-8" page={this.state.page} editables={this.state.editables} name="kitchen" editing={this.state.editing}/>
                    </div>
                    <div className="py-2 md:py-0">
                        <div className="text-2xl">Coffee Shop</div>
                        <Editable updateEditable={this.updateEditable}  className="h-8" page={this.state.page} editables={this.state.editables} name="coffee" editing={this.state.editing}/>
                    </div>
                </div>

            </div>
        }
        else {
            return <Loading/>
        }
    }

}

export default JBs;