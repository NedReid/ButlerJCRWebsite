import React from 'react';
import { getPostsOfTypes } from "../../helpers/staticHelper";
import {useNavigate} from "react-router-dom";

class LatestPostsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []}
    }

    async componentDidMount(){
        console.log("ARGGH")
        const posts = await getPostsOfTypes(this.props.types, 4)
        this.setState({posts: posts});
        console.log(posts)
    }

    goToPost(id) {
        this.props.navigate("/posts/" + id, {replace: false})

    }

    limitText(text, len) {
        if (text.length > len) {
            return text.slice(0, len - 3) + "..."
        }
        else {
            return text
        }
    }


    render() {
        return <div className="m-4">
            <div className="flex flex-col w-full">
                <div className="ml-4 my-2 text-2xl font-semibold">{this.props.text}</div>
                <div className="h-1 bg-gray-400"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center bg-gray-50">
                    {this.state.posts.map((post, index) => {
                        return <div key={post._id} className={"w-11/12 my-4 bg-white border-2 border-gray-400 rounded-lg transition-all ease-in-out duration-200 hover:translate-y-1 hover:brightness-90 hover:cursor-pointer" + (index >= 3? " lg:hidden xl:inline": "")}
                                    onClick={() => this.goToPost(post._id)}>
                            <div className="p-2 bg-gray-200 col-span-2 font-semibold text-lg rounded-t-lg text-ellipsis whitespace-nowrap">{this.limitText(post.title, 32)}</div>
                            <div className="p-2 col-span-2 bg-white text-sm rounded-b-lg">{this.limitText(post.post.replace("&nbsp;", " ").replace("</p>", " ").replace("</li>", " ").replace(/<[^>]+>/g, ''), 128)}</div>
                        </div>

                    })
                    }
                </div>
            </div>
            <div className="h-1 bg-gray-400"/>


        </div>

    }

}

const LatestPosts = (props) => {
    const navigate = useNavigate();

    return <LatestPostsComponent {...props} navigate={navigate} />;
}

export default LatestPosts