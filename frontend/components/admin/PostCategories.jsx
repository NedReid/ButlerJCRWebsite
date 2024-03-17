import React from "react";
import { getPostCategories } from "../../helpers/adminHelper";
import CreateEditPostCategory from "./CreateEditPostCategory";

class PostCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addingCategory: false, postCategories: [], currentCategory: undefined };
    }

    async componentDidMount() {
        const postCategories = await getPostCategories();
        this.setState({ postCategories: postCategories });
        console.log(postCategories);
    }

    editPostCategory = (event) => {
        const currentCategory = this.state.postCategories.find((category) => {
            return category._id === event.target.value;
        });
        console.log(currentCategory);
        this.setState({ currentCategory: currentCategory });
    };

    onUpdated = async () => {
        this.currentCategory = undefined;
        this.setState({ postCategories: [] });
        const postCategories = await getPostCategories();
        this.setState({ postCategories: postCategories });
    };

    onCreated = async () => {
        this.setState({ addingCategory: false });
        this.setState({ postCategories: [] });
        const postCategories = await getPostCategories();
        this.setState({ postCategories: postCategories });
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingCategory === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingCategory: true });
                        }}
                    >
                        Add Category
                    </button>
                )}
                {this.state.addingCategory === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingCategory: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditPostCategory closeTab={this.onCreated} />
                    </>
                )}
                <br />
                Edit Current Post Categories:
                <br />
                <select
                    defaultValue=""
                    onChange={this.editPostCategory}
                    key="postCategories"
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Select Category</option>
                    {this.state.postCategories.map((category, index) => {
                        return (
                            <option value={category._id} key={"category_" + index}>
                                {category.name}
                            </option>
                        );
                    })}
                </select>
                <br />
                {this.state.currentCategory !== undefined &&
                    this.state.postCategories.map((category, index) => {
                        if (category === this.state.currentCategory) {
                            console.log("AGHGG");
                            return (
                                <CreateEditPostCategory
                                    closeTab={this.onUpdated}
                                    key={index}
                                    postCategory={this.state.currentCategory}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

export default PostCategories;
