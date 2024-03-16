import React from "react";
import {updatePostCategory, createPostCategory, deletePostCategory} from '../../helpers/adminHelper';
import postCategoryModel from "../../models/postCategoryModel";

class CreateEditPostCategory extends React.Component {
    constructor(props) {

        super(props);
        this.state = {postCategory: new postCategoryModel()};
        if (props.postCategory !== undefined) {
            console.log("ARTRRGHHBERANS")
            this.state = {postCategory: props.postCategory}
        }
    }

    handleChange = (event, type) => {
        this.state.postCategory[type] = event.target.value;
        console.log(this.state.postCategory)
    }


    submitButton = async () => {
        if (this.props.postCategory !== undefined) {
            console.log(this.state.postCategory)
            await updatePostCategory(this.state.postCategory);
        }
        else {
            await createPostCategory(this.state.postCategory);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.postCategory.editors.length) {
            this.state.postCategory.editors.push("");
        }
        while (num < this.state.postCategory.editors.length) {
            this.state.postCategory.editors.pop();
        }
        this.forceUpdate();
    }

    updateEditor = (event, ind) => {
        this.state.postCategory.editors[ind] = event.target.value;
    }

    deleteButton = async () => {
        await deletePostCategory(this.state.postCategory);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label> Category name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.postCategory.name} onChange={(event) => this.handleChange(event, "name")}/>
            </label>


            <label> Number of Editors:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noEditors"
                       type="number" defaultValue={this.state.postCategory.editors.length} onChange={this.setArrayLength}
                       onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                               event.preventDefault();
                           }
                       }}
                /></label>
            {this.state.postCategory.editors.map((opt, index) => {
                return  <label className="flex" key={index}> Editor {index + 1} CIS Code:
                    <input className=" mx-2 mb-2 rounded border-2 border-slate-500 flex-grow"
                           name="questionText" type="text" defaultValue={this.state.postCategory.editors[index]} key={this.state.postCategory._id + "editor" + index} onChange={(event) => this.updateEditor(event, index)}/>
                </label>
            })

            }

        <input type="checkbox" id="my-modal" className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-red-700">Remove Category?!</h3>
                <p className="py-4">Are you sure you want to remove this category?</p>
                <div className="modal-action">
                    <label onClick={() => this.deleteButton()} htmlFor="my-modal" className="btn">Yes</label>
                    <label htmlFor="my-modal" className="btn">No</label>
                </div>
            </div>
        </div>

        </div>
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Save Category</button>

            {this.props.postCategory !== undefined && <label htmlFor="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Category</label>}


        </>
    }

}

export default CreateEditPostCategory;