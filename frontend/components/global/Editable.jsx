import React from 'react';
import InPlaceEditor from "./InPlaceEditor";
import TextEditor from "./TextEditor";
import { editableModel } from "../../models/editableModel";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";

class Editable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editable: new editableModel()}


    }
    async componentDidMount() {
        let initEd = this.props.editables.find(ed => ed.name === this.props.name)

        if (initEd !== undefined) {
            await this.setState({editable: initEd})
        }
        else {
            this.state.editable.page = this.props.page;
            this.state.editable.name = this.props.name;
        }
        this.props.updateEditable(this.state.editable)
        console.log(this.props.editables)
        this.forceUpdate();
    }

    updateEditable = (content) => {
        this.state.editable.content = content
        this.props.updateEditable(this.state.editable)
    }

    render() {
        if (this.props.editing) {
            return <div className="w-full h-full">
                <InPlaceEditor className="w-full h-full" initialValue={this.state.editable.content} onUpdate={this.updateEditable}/>
            </div>
        }
        else {
            return <div className="w-full h-full bangle-editor prose max-w-none">
                {parse(tailwindParse(this.state.editable.content))}
            </div>
        }
    }

}

export default Editable;