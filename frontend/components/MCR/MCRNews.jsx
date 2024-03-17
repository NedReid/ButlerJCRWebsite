import React from "react";
import { getPostsOfType } from "../../helpers/staticHelper";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";
class MCRNewsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    async componentDidMount() {
        console.log("ARGGH");
        const posts = await getPostsOfType("MCR News");
        this.setState({ posts: posts });
        console.log(posts);
    }

    goToPost(id) {
        this.props.navigate("/mcr/posts/" + id, { replace: false });
    }

    render() {
        return (
            <div>
                <div className="flex text-center flex-col w-full justify-center place-items-center">
                    <div className="my-4 text-4xl font-semibold">MCR News</div>
                </div>
                <div>
                    {this.state.posts.map((post, index) => {
                        const d = new Date(post.date);
                        return (
                            <div
                                className="grid grid-cols-3 gap-4 bg-gray-200 mb-4 mx-4 hover:translate-x-3 transition-transform ease-in-out duration-200 hover:brightness-90 hover:cursor-pointer"
                                key={index}
                                onClick={() => this.goToPost(post._id)}
                            >
                                <div className=" px-2 py-2 italic text-lg">
                                    {date.format(d, "DD/MM/YY")}
                                </div>
                                <div className=" px-2 py-2 bg-gray-100 col-span-2 font-semibold text-lg">
                                    {post.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const MCRNews = (props) => {
    const navigate = useNavigate();

    return <MCRNewsComponent {...props} navigate={navigate} />;
};
export default MCRNews;
