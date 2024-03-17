import React from "react";
import { getPost } from "../../helpers/staticHelper";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import { tailwindParse } from "../../helpers/tailwindParse";

class ViewPostComponent extends React.Component {
    constructor(props) {
        super(props);
        let postId = this.props.params["id"];
        console.log(postId);
        this.state = { post: undefined, postId: postId };
    }

    async componentDidMount() {
        const post = await getPost(this.state.postId);
        this.setState({ post: post });
        console.log("b" + post);
    }

    handleChange = (event, type) => {
        this.state.post[type] = event.target.value;
        console.log(this.state.post);
    };

    handleBoolChange = (event, type) => {
        this.state.post[type] = event.target.value === "true";
        console.log(this.state.post);
    };

    handlePage = (page) => {
        this.state.post.page = page;
    };

    render() {
        console.log("RENDERING", this.state.post);
        if (this.state.post !== undefined) {
            return (
                <div className="p-4">
                    <div className="my-4 text-3xl font-semibold">{this.state.post.title}</div>
                    <div className="bangle-editor prose max-w-2xl">
                        {/*{parse(this.state.post.page)}*/}
                        {parse(tailwindParse(this.state.post.post))}
                    </div>
                </div>
            );
        } else {
            return <Loading></Loading>;
        }
    }
}

const ViewPost = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <ViewPostComponent {...props} params={params} navigate={navigate} />;
};

export default ViewPost;
