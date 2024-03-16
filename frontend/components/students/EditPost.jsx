import React from "react";
import TextEditor from '../global/TextEditor';
import postModel from "../../models/postModel";
import {createPost, deletePost, updatePost} from "../../helpers/studentHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";

class EditPostComponent extends React.Component {
    constructor(props) {

        super(props);
        this.state = {post: new postModel()};
        if (props.post !== undefined) {
            this.state = {post: props.post}
        }
        else {
            this.state.post.category = this.props.postCategories[0]._id;
        }
    }

    handleChange = (event, type) => {
        this.state.post[type] = event.target.value;
        console.log(this.state.post)
    }

    handleBoolChange= (event, type) => {
        this.state.post[type] = (event.target.value === 'true');
        console.log(this.state.post)
    }

    handlePostCategory = (event) => {
        const postCategory = this.props.postCategories.find(page => {
            return page._id === event.target.value;
        });
        this.state.post.category = postCategory._id
    }

    handlePage = (page) => {
        this.state.post.post = page;
    }


    submitButton = async () => {
        if (this.props.post !== undefined) {
            console.log(this.state.post)
            console.log("OOPDating")
            await updatePost(this.state.post);
        }
        else {
            await createPost(this.state.post);
            console.log("CREA|TTED")
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    deleteButton = async () => {
        await deletePost(this.state.post);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    render() {
        console.log("RENDERING2")
        if (this.state.post !== undefined) {
            return <>
                <div className="mt-4 text-3xl font-semibold">Editing {this.state.post.title}</div>

                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

                    <label> Post Title:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                               name="title" type="text" defaultValue={this.state.post.title}
                               onChange={(event) => this.handleChange(event, "title")}/>
                    </label>
                    <br/>
                    <label> Post Category:</label>
                    <select defaultValue={this.state.post.category} onChange={this.handlePostCategory} key="posts"
                            className="select select-bordered w-full max-w-xs">
                        {this.props.postCategories.map((category, index) => {
                            return (
                                <option value={category._id} key={"category_" + index}>{category.name}</option>

                            );
                        })}
                    </select>

                    <label> Visible:</label>
                    <span>
                        <label><input defaultChecked={this.state.post.visible === false}
                                      onChange={(event) => this.handleBoolChange(event, "visible")} type="radio"
                                      name={this.state.post._id + "visible"} value={false}/>
                        False</label>
                        <label className="ml-2"><input defaultChecked={this.state.post.visible === true}
                                                       onChange={(event) => this.handleBoolChange(event, "visible")}
                                                       type="radio" name={this.state.post._id + "visible"} value={true}/>
                        True</label>
                    </span>

                <label> Post Content:</label>
                <div className="p-1 rounded border-2 border-slate-500">
                    <TextEditor initialValue={this.state.post.post} onUpdate={this.handlePage} />

                </div>

                    <input type="checkbox" id="my-modal" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Post?!</h3>
                            <p className="py-4">Are you sure you want to remove this Post?</p>
                            <div className="modal-action">
                                <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">Yes</label>
                                <label htmlFor="my-modal" className="btn">No</label>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Post</button>

                {this.props.post !== undefined && <label htmlFor="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Post
                </label>}

            </>
        }else {
                return <Loading></Loading>
            }
    }

}


const EditPost = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <EditPostComponent {...props} params={params} navigate={navigate} />;
}

export default EditPost