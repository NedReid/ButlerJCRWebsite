import React from 'react';
import InPlaceEditor from "./InPlaceEditor";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";
import FAQModel from "../../models/FAQModel";
import {Collapse, Modal} from "react-daisyui";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

class FAQBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {q: new FAQModel(), modalOpen:false}


    }
    async componentDidMount() {
        let initq = this.props.q

        if (initq !== undefined) {
            await this.setState({q: initq})
        }

        this.forceUpdate();
    }

    updateQuestion = (event) => {
        this.state.q.question = event.target.value
        this.props.updateFAQ(this.state.q, this.props.index)
    }

    updateAnswer = (answer) => {
        this.state.q.answer = answer
        this.props.updateFAQ(this.state.q, this.props.index)
    }

    deleteFAQ = () => {
        this.setState({modelOpen: false})
        console.log(this.props)
        this.props.deleteFAQ(this.state.q)
    }

    render() {
        const upDisabled = (this.props.index === 0)
        const downDisabled = (this.props.last)
        if (this.props.editing) {
            return <div className="my-2 hover:bg-gray-100" icon="arrow">
                <div className="p-4 border-l-4 border-gray-400">
                    <input className="rounded border-2 border-slate-500 text-xl font-semibold w-full"
                           name="question" type="text" defaultValue={this.state.q.question} onChange={(event) => this.updateQuestion(event)}></input>
                </div>
                <div className="pb-4 px-4 bg-white border-l-4 border-gray-200">
                    <div className="mt-2 w-full h-full">
                        <InPlaceEditor className="w-full h-full" initialValue={this.state.q.answer} onUpdate={this.updateAnswer} key={this.state.q._id}/>
                    </div>
                    <br/>
                    <div className="flex">
                        <button onClick={() => {this.setState({modelOpen: !this.state.modelOpen})}} className="bg-amber-400 rounded p-2 hover:cursor-pointer transition hover:bg-amber-600 modal-button">Delete FAQ</button>
                        <div className={"h-10 w-10 rounded-full ml-1 text-xl font-semibold transition-all duration-300 p-1" + (upDisabled? " text-gray-200": " hover:bg-gray-200 text-gray-400 hover:text-gray-600 hover:cursor-pointer")}
                        onClick={upDisabled? (() => {}) : (() => {this.props.reorder(this.props.index, true);this.forceUpdate()})}
                        ><AiOutlineArrowUp className="h-full my-auto w-full mx-auto"/></div>
                        <div className={"h-10 w-10 rounded-full ml-1 text-xl font-semibold transition-all duration-300 p-1" + (downDisabled? " text-gray-200": " hover:bg-gray-200 text-gray-400 hover:text-gray-600 hover:cursor-pointer")}
                        onClick={downDisabled? (() => {}) : (() => {this.props.reorder(this.props.index, false)})}
                        ><AiOutlineArrowDown className="h-full my-auto w-full mx-auto"/></div>
                    </div>

                </div>
                <Modal open={this.state.modelOpen}>
                    <Modal.Header className="font-bold text-lg text-red-700">Remove FAQ?!</Modal.Header>
                    <Modal.Body>
                        <p className="py-4">Are you sure you want to remove this FAQ Question? {this.state.q.question}</p>
                    </Modal.Body>
                    <Modal.Actions>
                        <label onClick={this.deleteFAQ} className="btn">Yes</label>
                        <label onClick={() => {this.setState({modelOpen: !this.state.modelOpen})}} className="btn">No</label>
                    </Modal.Actions>
                </Modal>
            </div>


        }
        else {
            return <Collapse className="my-2 hover:bg-gray-100 active:bg-gray-200" icon="arrow" >
                <input id={"toggle" + this.props.index} type="checkbox" className="peer"/>

                <Collapse.Title className="border-l-4 border-gray-400">
                    <div className="text-xl font-semibold">{this.state.q.question}</div>
                </Collapse.Title>
                <Collapse.Content className="bg-white border-l-4 border-gray-200">
                    <div className="mt-2 bangle-editor prose max-w-none">
                        {parse(tailwindParse(this.state.q.answer))}
                    </div>
                </Collapse.Content>
            </Collapse>

        }
    }

}

export default FAQBlock;