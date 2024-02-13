import React from 'react';
import {Modal} from 'react-daisyui';
import whosWhoModel from "../../models/whosWhoModel";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineDelete
} from "react-icons/ai";

class WhosWhoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {person: new whosWhoModel(), modalOpen:false}


    }
    async componentDidMount() {
        let initPerson = this.props.person

        if (initPerson !== undefined) {
            await this.setState({person: initPerson})
        }

        this.forceUpdate();
    }

    handleChange = (event, type) => {
        this.state.person[type] = event.target.value;
        this.props.updateWhosWho(this.state.person, this.props.index)
    }

    handleMoveSubcategory = (event) => {
        this.state.person.subcategory = event.target.value;
        this.props.moveSubcategory(this.state.person, this.props.index)
    }

    handleImageChange = async (event, type) => {
        let im = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.state.person[type] = reader.result;
            this.forceUpdate();
        }
        reader.readAsDataURL(im);
    }

    deletePerson = () => {
        this.setState({modelOpen: false})
        this.props.deleteWhosWho(this.state.person)
    }

    render() {
        const upDisabled = (this.props.first);
        const downDisabled = (this.props.last);
        if (this.props.editing) {
            return <div className="bg-gray-100 m-4 border-slate-400 text-center justify-items-center p-2 h-120 w-88 border-2 rounded-lg drop-shadow-xl bg-white">
                <div>
                    <label>Name: <input className="ml-auto rounded border-2 border-slate-500"
                                                                        name="name" type="text" defaultValue={this.state.person.name} onChange={(event) => this.handleChange(event, "name")}/>
                    </label>
                    <br/>
                    <label>Role: <input className="ml-auto rounded border-2 border-slate-500"
                                                                        name="role" type="text" defaultValue={this.state.person.role} onChange={(event) => this.handleChange(event, "role")}/>
                    </label>
                    <br/>
                    <div>Role Category: </div>
                   <select defaultValue={this.props.person.subcategory} onChange={(event) => this.handleMoveSubcategory(event)} className="select select-bordered w-full max-w-xs">
                                <option value="">Select role category</option>
                        {this.props.subcategories.map((subcategory, index) => {
                            return (
                                <option value={subcategory} key={this.typeSelect + "_" + index}>{subcategory}</option>
                            );
                        })}
                    </select>
                    <br/>
                    <label>Pronouns: <input className="ml-auto rounded border-2 border-slate-500"
                                                                        name="pronouns" type="text" defaultValue={this.state.person.pronouns} onChange={(event) => this.handleChange(event, "pronouns")}/>
                    </label>
                    <br/>
                    <label>Email: <input className="ml-auto rounded border-2 border-slate-500"
                                                                        name="email" type="text" defaultValue={this.state.person.email} onChange={(event) => this.handleChange(event, "email")}/>
                    </label>
                    <br/>

                    <label>Photo:
                        <input className="ml-2 mb-2 rounded border-2 border-slate-500 flex"
                               name="photo" type="file" accept="image/*" onChange={(event) => this.handleImageChange(event, "photo")}/>
                        {this.state.person.photo !== "" && (
                                <img className="h-24 object-contain" src={this.state.person.photo}/>
                        )}            </label>
                    <br/>

                    <div className="flex">
                        <div className={"h-10 w-10 rounded-full ml-1 text-xl font-semibold transition-all duration-300 p-1" + (upDisabled? " text-gray-200": " hover:bg-gray-200 text-gray-600 hover:text-gray-800 hover:cursor-pointer")}
                             onClick={upDisabled? (() => {}) : (() => {this.props.reorder(this.props.index, true);this.forceUpdate()})}
                        ><AiOutlineArrowLeft className="h-full my-auto w-full mx-auto"/></div>
                        <div className={"h-10 w-10 rounded-full ml-1 text-xl font-semibold transition-all duration-300 p-1" + (downDisabled? " text-gray-200": " hover:bg-gray-200 text-gray-600 hover:text-gray-800 hover:cursor-pointer")}
                             onClick={downDisabled? (() => {}) : (() => {this.props.reorder(this.props.index, false)})}
                        ><AiOutlineArrowRight className="h-full my-auto w-full mx-auto"/></div>
                        <button onClick={() => {this.setState({modelOpen: !this.state.modelOpen})}} className="modal-button h-10 w-10 rounded-full ml-auto text-xl font-semibold transition-all duration-300 hover:bg-gray-200 text-gray-600 hover:text-gray-800 p-1"><AiOutlineDelete className="h-full my-auto w-full mx-auto"/></button>
                    </div>
                </div>
                <Modal open={this.state.modelOpen}>
                    <Modal.Header className="font-bold text-lg text-red-700">Remove Person?!</Modal.Header>
                    <Modal.Body>
                        <p className="py-4">Are you sure you want to remove {this.state.person.name}? </p>
                    </Modal.Body>
                    <Modal.Actions>
                        <label onClick={this.deletePerson} className="btn">Yes</label>
                        <label onClick={() => {this.setState({modelOpen: !this.state.modelOpen})}} className="btn">No</label>
                    </Modal.Actions>
                </Modal>
            </div>


        }
        else {
            return <div className="m-4 border-slate-400 text-center justify-items-center p-2 h-44 w-88 border-2 rounded-lg drop-shadow-xl bg-white">
                <div className="grid grid-cols-2">
                    <img className="my-auto w-40 h-40 object-contain" src={this.state.person.photo}/>
                    <div className="text-center justify-items-center w-40 pl-2">
                        <div className="text-lg">{this.state.person.name} <span className="text-sm">({this.state.person.pronouns})</span></div>
                        <div className="">{this.state.person.role}</div>
                        <a className="break-all text-blue-700 underline text-sm" href={"mailto:" + this.state.person.email}>{this.state.person.email}</a>
                    </div>
                </div>
            </div>


        }
    }

}

export default WhosWhoBlock;