import React from 'react';
import WhosWhoBlock from "./WhosWhoBlock";
import {getWhosWhoOfCategory} from "../../helpers/staticHelper";
import whosWhoModel from "../../models/whosWhoModel";
import {createWhosWho, deleteWhosWho, updateWhosWho} from "../../helpers/adminHelper";
import {AiFillEdit, AiFillSave} from "react-icons/ai";
import Loading from "../global/Loading";

class WhosWho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {whosWho: "waiting", editor: props.admin.democracy, editing: false, category: "jcr", saving: false, newCategoryText: ""}
    }

    async componentDidMount() {
        let res = await getWhosWhoOfCategory(this.state.category)
        const res1 = res.map((person) => {return new whosWhoModel(person)})
        const res2 = res.map((person) => {return new whosWhoModel(person)})
        res1.sort((a, b) => {return a.order - b.order})
        console.log(res1)
        await this.setState({whosWho: res1, originalWhosWho: res2})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.admin !== this.props.admin) {
            this.setState({editor: this.props.admin.freshers })
        }
    }

    updateWhosWho = (person, index) => {
        this.state.whosWho[index] = person
        console.log(person)
    }

    updateNewCategoryText = (event) => {
        console.log(event.target.value)
        this.setState({newCategoryText: event.target.value})
    }

    addOrder = (order, subcategory) => {
        if (subcategory in order) {
            return {...order, subcategory: 1}
        }
        else {
            return {...order, subcategory: order[subcategory] + 1}
        }
    }

    getTempId = () => {
        while (true) {
            const tempId = Math.floor((Math.random() * 1000000))
            if (!this.state.whosWho.some((person) => person._id === tempId.toString())) {
                return tempId.toString()
            }

        }
    }

    onChange = async () => {
        const newWhosWho = this.state.whosWho.map((person, index) => {
            person.order = index;
            return person
        })
        if (this.state.editing) {
            for (const op of this.state.originalWhosWho) {
                let np = newWhosWho.filter((p) => {return (op._id === p._id)})
                if (np.length === 0) {
                    await deleteWhosWho(op)
                }
            }
            for (const np of newWhosWho) {
                let op = this.state.originalWhosWho.filter((p) => {return (np._id === p._id)})
                if (op.length === 0) {
                    console.log("Np", np)
                    np._id = undefined
                    await createWhosWho(np)
                }
                else if (JSON.stringify(op[0]) !== JSON.stringify(np)) {
                    await updateWhosWho(np)
                }
            }
            let res = await getWhosWhoOfCategory(this.state.category)
            const res1 = res.map((p) => {return new whosWhoModel(p)})
            const res2 = res.map((p) => {return new whosWhoModel(p)})
            res1.sort((a, b) => {return a.order - b.order})
            await this.setState({whosWho: res1, originalWhosWho: res2})

        }
        this.setState({editing: !this.state.editing})
    }

    newWhosWho = (subcategory) => {
        let newPerson = new whosWhoModel()
        newPerson.category = this.state.category;
        newPerson.subcategory = subcategory;
        newPerson.photo = "media/whoswho/jb.jpg"
        newPerson._id = this.getTempId();
        this.setState({whosWho: [...this.state.whosWho, newPerson]})
        this.forceUpdate();
    }

    newSubcategory = () => {
        let newPerson = new whosWhoModel()
        newPerson.category = this.state.category;
        newPerson.subcategory = this.state.newCategoryText;
        newPerson.photo = "media/whoswho/jb.jpg"
        newPerson.order = 0;
        newPerson._id = this.getTempId();
        this.setState({subCategory: "", whosWho: [...this.state.whosWho, newPerson]})
        this.forceUpdate();
    }

    deleteWhosWho = (person) => {
        console.log(person)
        this.setState({whosWho: this.state.whosWho.filter((np) => {return np._id !== person._id})})

    }

    reorder = (index, up) => {
        let newWhosWho = this.state.whosWho
        if (up) {
            let temp = newWhosWho[index - 1]
            newWhosWho[index - 1] = newWhosWho[index]
            newWhosWho[index] = temp
            console.log("up", index)
        } else {
            const temp = newWhosWho[index + 1]
            newWhosWho[index + 1] = newWhosWho[index]
            newWhosWho[index] = temp
            console.log("down")

        }
        this.setState({whosWho: newWhosWho})
        console.log("done", newWhosWho)
    }

    moveSubcategory = (personToMove, index) => {
        let newWhosWho = this.state.whosWho
        newWhosWho.splice(index, 1);
        const lastOfNewCategoryIndex = newWhosWho.findLastIndex((person) => person.subcategory === personToMove.subcategory);
        newWhosWho.splice(lastOfNewCategoryIndex + 1, 0, personToMove)
        this.setState({whosWho: newWhosWho})
    }



    render() {
        const subcategories = this.state.whosWho !== "waiting" ? [...new Set(this.state.whosWho.map((person) => person.subcategory))] : []

        return <div className="flex text-center flex-col w-full justify-center place-items-center relative">
            {(this.state.whosWho !== "waiting" && this.props.admin !== "waiting" && this.state.saving === false)?
                <>
                    {this.state.editor && <button className={"z-30 btn btn-circle absolute top-0 right-0 my-2 swap swap-rotate " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                        <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                        <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                    </button>}

                    <div className="text-4xl font-semibold">Who's Who</div>

                    {subcategories.map((subcategory) => {
                        const peopleOfSubcategory = this.state.whosWho.filter((person) => person.subcategory === subcategory)
                        return <div className="mb-8">
                            <div className="my-4 text-3xl font-semibold">{subcategory}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                            {
                                peopleOfSubcategory.map((person, index) => {
                                const globalIndex = this.state.whosWho.indexOf(person)
                                return <WhosWhoBlock person={person} index={globalIndex} subcategories={subcategories}
                                                     first={(index === 0)}
                                                     moveSubcategory = {this.moveSubcategory}
                                                     last={(index === peopleOfSubcategory.length - 1)}
                                                     editing={this.state.editing} updateWhosWho={this.updateWhosWho}
                                                     deleteWhosWho={this.deleteWhosWho} reorder={this.reorder}
                                                     key={person._id}></WhosWhoBlock>
                                })
                            }
                            </div>
                            {this.state.editing &&
                                <button className="mt-4 bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => this.newWhosWho(subcategory)}>Add Person</button>
                            }
                        </div>
                    })}
                    { this.state.editing &&
                        <div className="bg-gray-100 border-2 border-gray-600 rounded-lg flex w-full p-2 max-w-xl">
                            <label className="my-auto">Add new category: <input className="rounded border-2 border-slate-500"
                                       name="newCategoryText" type="text" defaultValue={this.state.newCategoryText} onChange={this.updateNewCategoryText}/>
                            </label>

                        <button className="ml-auto bg-gray-400 rounded p-2 transition hover:bg-gray-600" onClick={this.newSubcategory}>Add new category</button>
                        </div>
                    }

                </>
                :
                <Loading/>
            }

        </div>
    }
}

export default WhosWho;