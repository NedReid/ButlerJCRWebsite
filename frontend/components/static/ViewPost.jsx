import React from "react";
import {createEvent, updateEvent} from '../../helpers/adminHelper';
import eventModel from '../../models/eventModel';
import { selectionModeEnum } from "../../models/selectionModeEnum";
import DateTimePicker from 'react-datetime-picker';
import TextEditor from '../global/TextEditor';
import questionModel from "../../models/questionModel";
import SSCModel from "../../models/SSCModel";
import { getPost } from "../../helpers/staticHelper";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";

class ViewPost extends React.Component {
    constructor(props) {

        super(props);
        let postId = this.props.params["id"]
        console.log(postId)
        this.state = {post: undefined, postId: postId};
    }

    async componentDidMount() {
        const post = await getPost(this.state.postId)
        this.setState({post: post});
        console.log("b" + post)
    }

    handleChange = (event, type) => {
        this.state.post[type] = event.target.value;
        console.log(this.state.post)
    }

    handleBoolChange= (event, type) => {
        this.state.post[type] = (event.target.value === 'true');
        console.log(this.state.post)
    }



    handlePage = (page) => {
        this.state.post.page = page;
    }


    submitButton = async (event) => {
        await updatePost(this.state.post);

        this.props.navigate("get-involved/" + this.state.post.slug, {replace: false})

    }


    render() {
        console.log("RENDERING", this.state.post)
        if (this.state.post !== undefined) {
            return <div className="p-4">
                <div className="my-4 text-3xl font-semibold">{this.state.post.title}</div>
                <div className="bangle-editor prose max-w-2xl">
                    {/*{parse(this.state.post.page)}*/}
                    {parse(tailwindParse(this.state.post.post))}
                </div>
            </div>
        } else {
            return <Loading></Loading>
        }
    }

}


export default function(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <ViewPost {...props} params={params} navigate={navigate} />;
}