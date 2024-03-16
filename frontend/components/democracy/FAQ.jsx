import React from 'react';
import {getFAQofCategory} from "../../helpers/staticHelper";
import {AiFillEdit, AiFillSave} from "react-icons/ai";
import FAQModel from "../../models/FAQModel";
import {createFAQ, updateFAQ, deleteFAQ} from "../../helpers/adminHelper";
import Loading from "../global/Loading";
import FAQBlock from "../global/FAQBlock";

class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {FAQ: "waiting", editor: props.admin.democracy, editing: false, category: "jcr", saving: false, nextOrder: 0}
    }

    async componentDidMount() {
        let res = await getFAQofCategory(this.state.category)
        const res1 = res.map((q) => {return new FAQModel(q)})
        const res2 = res.map((q) => {return new FAQModel(q)})
        res1.sort((a, b) => {return a.order - b.order})
        console.log(this.props.admin)
        await this.setState({FAQ: res1, originalFAQ: res2, nextOrder:res1.length})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.admin !== this.props.admin) {
            this.setState({editor: this.props.admin.democracy })
        }
    }

    updateFAQ = (q, index) => {
        this.state.FAQ[index] = q
        console.log(q)
    }

    onChange = async () => {
        const newFAQ = this.state.FAQ.map((q, index) => {
            q.order = index;
            return q
        })
        if (this.state.editing) {
            for (const oq of this.state.originalFAQ) {
                let nq = newFAQ.filter((q) => {return (oq._id === q._id)})
                if (nq.length === 0) {
                    await deleteFAQ(oq)
                }
            }
            for (const nq of newFAQ) {
                let oq = this.state.originalFAQ.filter((q) => {return (nq._id === q._id)})
                if (oq.length === 0) {
                    console.log("NQ", nq)
                    await createFAQ(nq)
                }
                else if (JSON.stringify(oq[0]) !== JSON.stringify(nq)) {
                    await updateFAQ(nq)
                }
            }
            let res = await getFAQofCategory(this.state.category)
            const res1 = res.map((q) => {return new FAQModel(q)})
            const res2 = res.map((q) => {return new FAQModel(q)})
            res1.sort((a, b) => {return a.order - b.order})
            await this.setState({FAQ: res1, originalFAQ: res2})

        }
        this.setState({editing: !this.state.editing})
    }

    newFAQ = () => {
        let newQ = new FAQModel()
        newQ.category = this.state.category;
        newQ.order = this.state.nextOrder;
        newQ._id = this.state.nextOrder;
        this.setState({nextOrder: this.state.nextOrder + 1, FAQ: [...this.state.FAQ, newQ]})
        this.forceUpdate();
    }

    deleteFAQ = (q) => {
        console.log(q)
        this.setState({FAQ: this.state.FAQ.filter((nq) => {return nq._id !== q._id})})

    }

    reorder = (index, up) => {
        let newFAQ = this.state.FAQ
        if (up) {
            let temp = newFAQ[index - 1]
            newFAQ[index - 1] = newFAQ[index]
            newFAQ[index] = temp
            console.log("up", index)
        } else {
            const temp = newFAQ[index + 1]
            newFAQ[index + 1] = newFAQ[index]
            newFAQ[index] = temp
            console.log("down")

        }
        this.setState({FAQ: newFAQ})
        console.log("done", newFAQ)
    }



    render() {
        console.log(this.state)
        console.log(this.props)
        return <div>
            {(this.state.FAQ !== "waiting" && this.props.admin !== "waiting" && this.state.saving === false)?
                <div className="relative m-4">
                    {this.state.editor && <button className={"z-30 btn btn-circle absolute top-0 right-0 m-2 swap swap-rotate " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                        <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                        <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                    </button>}

                    <div className="text-4xl font-semibold">JCR FAQ</div>
                    <div className="mt-2">JCR roles, motions and elections can be slightly complicated, and you may have a lot of questions about how they are run! Here are a few frequently asked questions: If you have any more questions,
                    please contact the JCR Chair!</div>

                    {this.state.FAQ.map((q, index) => {
                        return <FAQBlock q={q} index={index} last={(index === this.state.FAQ.length - 1)} editing={this.state.editing} updateFAQ={this.updateFAQ} deleteFAQ={this.deleteFAQ} reorder={this.reorder} key={q._id}></FAQBlock>
                    })}

                    { this.state.editing &&
                    <button className="mt-4 bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.newFAQ}>Add FAQ</button>
                    }
                </div>
            :
                <Loading/>
            }

        </div>
    }

}

export default FAQ;