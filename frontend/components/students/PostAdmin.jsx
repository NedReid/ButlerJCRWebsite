import React from "react";
import { getUserPosts, getPostCategories, getPost } from "../../helpers/studentHelper";
import EditPost from "./EditPost";
import { Divider } from "react-daisyui";
import Loading from "../global/Loading";

class PostAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addingPost: false, posts: [], currentPost: undefined, postCategories: [] };
    }

    async componentDidMount() {
        const posts = await getUserPosts();
        const postCategories = await getPostCategories();
        this.setState({ posts: posts, postCategories: postCategories });
        console.log(posts);
    }

    editPost = async (event) => {
        const currentPost = await getPost(event.target.value);
        console.log(currentPost);
        await this.setState({ currentPost: currentPost });
        console.log(this.state.currentPost);
    };

    onUpdated = async () => {
        this.setState({ currentPost: undefined });
        this.setState({ posts: [] });
        const posts = await getUserPosts();
        this.setState({ posts: posts });
    };

    onCreated = async () => {
        this.setState({ addingPost: false });
        this.setState({ posts: [] });
        const posts = await getUserPosts();
        this.setState({ posts: posts });
    };

    render() {
        return this.state.postCategories.length > 0 ? (
            <div className="my-4 p-2">
                <div className="text-4xl font-semibold my-4">Manage Posts</div>
                {this.state.addingPost === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingPost: true });
                        }}
                    >
                        New Post
                    </button>
                )}
                {this.state.addingPost === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingPost: false });
                            }}
                        >
                            Cancel
                        </button>
                        <EditPost
                            postCategories={this.state.postCategories}
                            closeTab={this.onCreated}
                        />
                    </>
                )}
                <Divider />
                <div className="text-2xl font-semibold">Edit Current Post:</div>
                <br />

                <select
                    defaultValue=""
                    onChange={this.editPost}
                    key="posts"
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Select Page</option>
                    {this.state.posts.map((post, index) => {
                        return (
                            <option value={post._id} key={"post_" + index}>
                                {post.title}
                            </option>
                        );
                    })}
                </select>
                <br />
                {this.state.currentPost !== undefined &&
                    this.state.posts.map((page, index) => {
                        if (page._id === this.state.currentPost._id) {
                            return (
                                <EditPost
                                    postCategories={this.state.postCategories}
                                    closeTab={this.onUpdated}
                                    key={index}
                                    post={this.state.currentPost}
                                />
                            );
                        }
                    })}
            </div>
        ) : (
            <Loading />
        );
    }
}

export default PostAdmin;
