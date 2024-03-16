import React from 'react';
import {getPageEditables, updatePageEditables} from "../../helpers/staticHelper";
import Editable from "../global/Editable";
import {AiFillEdit, AiFillSave} from "react-icons/ai";
import {Link} from "react-router-dom";

class FreshersSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editables: "waiting", editor: false, editing: false, page: "freshers"}

    }

    async componentDidMount() {
        let res = await getPageEditables(this.state.page)
        console.log("ARHG")
        console.log(res)
        await this.setState({editables: res.editables, editor: res.editor})
    }

    updateEditable = (editable) => {
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

        return <div>
            {(this.state.editables !== "waiting") &&

                <div className="relative">
                    <div className="mt-4 text-4xl font-semibold">Freshers Week Schedule</div>
                    <div className="text-lg mt-1">Follow this page for up-to-date information on all our Freshers Week activities!
                        For a full list of all our events from {`Freshers'`} Week and beyond, you can also visit our <Link className="link text-blue-700 hover:text-blue-800" to="/calendar">JCR Calendar!</Link>
                    </div>
                    {this.state.editor && <button className={"z-30 btn btn-circle absolute top-0 right-0 m-2 swap swap-rotate " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                        <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                        <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                    </button>}
                    <div className="mt-4 py-2 md:py-0 md:pr-2">
                        <Editable updateEditable={this.updateEditable}  className="h-8" page={this.state.page} editables={this.state.editables} name="schedule" editing={this.state.editing}/>
                    </div>

                </div>}

        </div>
    }

}

export default FreshersSchedule;