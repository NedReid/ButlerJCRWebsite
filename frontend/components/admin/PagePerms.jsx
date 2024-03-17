import React from "react";
import { getPagePerms } from "../../helpers/adminHelper";
import CreateEditPagePerm from "./CreateEditPagePerm";

class PagePerms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addingPerm: false, pagePerms: [], currentPerm: undefined };
    }

    async componentDidMount() {
        const pagePerms = await getPagePerms();
        this.setState({ pagePerms: pagePerms });
        console.log(pagePerms);
    }

    editPagePerm = (event) => {
        const currentPerm = this.state.pagePerms.find((page) => {
            return page._id === event.target.value;
        });
        console.log(currentPerm);
        this.setState({ currentPerm: currentPerm });
    };

    onUpdated = async () => {
        this.currentPerm = undefined;
        this.setState({ pagePerms: [] });
        const pagePerms = await getPagePerms();
        this.setState({ pagePerms: pagePerms });
    };

    onCreated = async () => {
        this.setState({ addingPerm: false });
        this.setState({ pagePerms: [] });
        const pagePerms = await getPagePerms();
        this.setState({ pagePerms: pagePerms });
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingPerm === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingPerm: true });
                        }}
                    >
                        Add Page
                    </button>
                )}
                {this.state.addingPerm === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingPerm: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditPagePerm closeTab={this.onCreated} />
                    </>
                )}
                <br />
                Edit Current Page Permissions:
                <br />
                <select
                    defaultValue=""
                    onChange={this.editPagePerm}
                    key="pagePerms"
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Select Page</option>
                    {this.state.pagePerms.map((page, index) => {
                        return (
                            <option value={page._id} key={"page_" + index}>
                                {page.page}
                            </option>
                        );
                    })}
                </select>
                <br />
                {this.state.currentPerm !== undefined &&
                    this.state.pagePerms.map((page, index) => {
                        if (page === this.state.currentPerm) {
                            return (
                                <CreateEditPagePerm
                                    closeTab={this.onUpdated}
                                    key={index}
                                    pagePerm={this.state.currentPerm}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

export default PagePerms;
