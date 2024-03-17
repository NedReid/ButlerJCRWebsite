import React from "react";
import { deleteMember, updateMember, getMembers } from "../../helpers/adminHelper";
import { Table, Pagination, Button } from "react-daisyui";
import date from "date-and-time";
import two_digit_year from "date-and-time/plugin/two-digit-year";
import MiniEditor from "../global/MiniEditor";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
date.plugin(two_digit_year);

class MemberTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: undefined,
            toDelete: undefined,
            descending: false,
            sortby: "",
            page: 1,
        };
    }

    componentDidMount = async () => {
        let promisedSetState = (newState) =>
            new Promise((resolve) => this.setState(newState, resolve));

        const members = await getMembers();
        await promisedSetState({ members });
        await this.sortMembers("username");
    };

    saveText = async (text, index, type) => {
        this.state.members[index][type] = text;
        console.log(this.state.members[index]);
        await updateMember(this.state.members[index]);
    };

    saveDate = async (text, index, type) => {
        console.log(date.parse("01/01/2222", "DD/MM/YYYY"));
        console.log(text);
        this.state.members[index][type] = new Date(date.parse(text, "DD/MM/YY")).valueOf();
        console.log(this.state.members[index]);
        await updateMember(this.state.members[index]);
    };

    deleteButton = async () => {
        await deleteMember(this.state.toDelete);
        await this.setState({
            members: this.state.members.filter((member) => member._id !== this.state.toDelete._id),
        });
        await this.setState({ toDelete: undefined });
    };

    sortMembers = async (category) => {
        console.log(this.state.members);
        if (this.state.sortby !== category) {
            await this.setState({ sortby: category, descending: false });
        } else {
            await this.setState({ descending: !this.state.descending });
        }

        const multiplier = this.state.descending ? -1 : 1;
        let newMembers = this.state.members.sort((a, b) =>
            a[category] > b[category]
                ? 1 * multiplier
                : b[category] > a[category]
                  ? -1 * multiplier
                  : 0,
        );
        this.setState({ members: newMembers });
    };

    render() {
        console.log("RENDERING");
        const icons =
            "text-xl align-middle justify-self-center text-gray-500 hover:text-gray-800 hover:cursor-pointer ml-2";
        const pages =
            this.state.members === undefined ? 1 : Math.ceil(this.state.members.length / 20);
        return this.state.members !== undefined ? (
            <div className="grid">
                <Table compact className="mx-4 mt-2">
                    <Table.Head>
                        <span className="flex">
                            CIS Code
                            {this.state.sortby !== "username" || !this.state.descending ? (
                                <AiOutlineSortAscending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("username")}
                                />
                            ) : (
                                <AiOutlineSortDescending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("username")}
                                />
                            )}
                        </span>
                        <span className="flex">
                            Transaction
                            {this.state.sortby !== "transaction" || !this.state.descending ? (
                                <AiOutlineSortAscending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("transaction")}
                                />
                            ) : (
                                <AiOutlineSortDescending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("transaction")}
                                />
                            )}
                        </span>
                        <span className="flex">
                            Expiry Date
                            {this.state.sortby !== "expiry" || !this.state.descending ? (
                                <AiOutlineSortAscending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("expiry")}
                                />
                            ) : (
                                <AiOutlineSortDescending
                                    className={icons}
                                    onClick={async () => await this.sortMembers("expiry")}
                                />
                            )}
                        </span>
                        <span>Delete</span>
                    </Table.Head>
                    <Table.Body>
                        {this.state.members
                            .slice((this.state.page - 1) * 20, this.state.page * 20)
                            .map((member, index) => {
                                return (
                                    <Table.Row key={member._id}>
                                        <span>
                                            <MiniEditor
                                                text={member.username}
                                                saveText={(text) =>
                                                    this.saveText(text, index, "username")
                                                }
                                            ></MiniEditor>
                                        </span>
                                        <span>
                                            <MiniEditor
                                                text={member.transaction}
                                                saveText={(text) =>
                                                    this.saveText(text, index, "transaction")
                                                }
                                            ></MiniEditor>
                                        </span>
                                        <span>
                                            <MiniEditor
                                                text={date.format(
                                                    new Date(member.expiry),
                                                    "DD/MM/YY",
                                                )}
                                                saveText={(text) =>
                                                    this.saveDate(text, index, "expiry")
                                                }
                                            ></MiniEditor>
                                        </span>
                                        <label
                                            htmlFor="my-modal"
                                            className="text-blue-700 hover:text-blue-800 hover:cursor-pointer underline model-button"
                                            onClick={async () =>
                                                this.setState({ toDelete: member })
                                            }
                                        >
                                            Delete
                                        </label>
                                    </Table.Row>
                                );
                            })}
                    </Table.Body>
                </Table>
                <Pagination className=" flex justify-center">
                    {Array.from(Array(pages).keys()).map((i) => {
                        if (
                            pages <= 10 ||
                            i < 1 ||
                            i > pages - 2 ||
                            Math.abs(this.state.page - 1 - i) < 4 ||
                            (this.state.page - 1 - i === 4 && this.state.page === 6) ||
                            (this.state.page - 1 - i === -4 && this.state.page === pages - 5)
                        ) {
                            return (
                                <Button
                                    key={i}
                                    active={this.state.page === i + 1}
                                    onClick={async () => this.setState({ page: i + 1 })}
                                >
                                    {i + 1}
                                </Button>
                            );
                        } else if (Math.abs(this.state.page - 1 - i) === 4) {
                            return (
                                <Button key={i} disabled>
                                    ...
                                </Button>
                            );
                        }
                    })}
                </Pagination>

                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-red-700">Delete Member?!</h3>
                        <p className="py-4">
                            Are you sure you want to delete{" "}
                            {this.state.toDelete ? this.state.toDelete.username : "this user"} as a
                            JCR Member?
                        </p>
                        <div className="modal-action">
                            <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">
                                Delete
                            </label>
                            <label htmlFor="my-modal" className="btn">
                                Cancel
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        );
    }
}

export default MemberTable;
