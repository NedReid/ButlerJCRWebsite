import React from "react";
import questionModel from '../../models/questionModel';
import {questionTypeEnum} from "../../models/questionTypeEnum";

class CreateEditQuestion extends React.Component {
    constructor(props) {

        super(props);
        this.state = {qu: new questionModel()};
        if (props.qu !== undefined) {
            this.state = {qu: props.qu}
        }
        this.noOptions
    }
    updateOptionText = (event, ind) => {
           this.state.qu.data[ind] = event.target.value;
    }

    handleChange = (event, type) => {
        this.state.qu[type] = event.target.value;
        console.log(this.state.qu)
    }
    handleNumChange= (event, type) => {
        this.state.qu[type] = parseInt(event.target.value);
        console.log(this.state.qu)
        this.forceUpdate();
    }

    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.qu.data.length) {
            this.state.qu.data.push("");
        }
        while (num < this.state.qu.data.length) {
            this.state.qu.data.pop();
        }
        this.forceUpdate();
    }

    render() {
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label className="flex"> Question:
                <input className=" mx-2 mb-2 rounded border-2 border-slate-500 flex-grow"
                    name="questionText" type="text" defaultValue={this.state.qu.questionText} onChange={(event) => this.handleChange(event, "questionText")}/>
            </label>

            <label> Question Type:</label>
            <span>
                <label><input defaultChecked={this.state.qu.questionType === questionTypeEnum.text}  onChange={(event) => this.handleNumChange(event, "questionType")} type="radio" id="ts1" name={this.props._id + this.state.qu.id + "questionType"} value={questionTypeEnum.text}/>
                Text</label>
                <label className="ml-4"><input defaultChecked={this.state.qu.questionType === questionTypeEnum.multipleChoice} onChange={(event) => this.handleNumChange(event, "questionType")} type="radio" id="ts2" name={this.props._id + this.state.qu.id + "questionType"} value={questionTypeEnum.multipleChoice}/>
                Multiple Choice</label>
                <label className="ml-4"><input defaultChecked={this.state.qu.questionType === questionTypeEnum.number} onChange={(event) => this.handleNumChange(event, "questionType")} type="radio" id="ts3" name={this.props._id + this.state.qu.id + "questionType"} value={questionTypeEnum.number}/>
                Number</label>
            </span>

            {this.state.qu.questionType === questionTypeEnum.multipleChoice &&
                <>
                    <label> Number of options:
                        <input className=" ml-2 mb-2 rounded border-2 border-slate-500" name="noTickets"
                               type="number" defaultValue={this.state.qu.data.length} onChange={this.setArrayLength}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        /></label>
                    {this.state.qu.data.map((opt, index) => {
                        return  <label className="flex" key={index}> Option {index + 1}:
                            <input className=" mx-2 mb-2 rounded border-2 border-slate-500 flex-grow"
                                   name="questionText" type="text" defaultValue={this.state.qu.data[index]} key={this.props._id + this.state.qu.id + "o" + index} onChange={(event) => this.updateOptionText(event, index)}/>
                        </label>
                    })

                    }

                </>
            }
        </div>
        </>
    }

}

export default CreateEditQuestion;