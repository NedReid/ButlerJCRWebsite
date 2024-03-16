import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import React from "react";

class MiniEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editing: false, text: props.text};
    }

    saveText = async () => {
        await this.props.saveText(this.state.text);
        this.setState({editing:false})
    }

    changeText = async (event) => {
        await this.setState({text:event.target.value})
        console.log(event.target.value)
    }

    render()
    {
        return <div className="flex">
            <div className="flex-grow justify-center flex">
                {this.state.editing? <>
                    <input className="flex flex-grow rounded border-2 border-slate-500  mr-2 align-middle justify-self-center"
                           name="name" type="text" defaultValue={this.state.text} onChange={async (event) => await this.changeText(event)}/>

                    <AiOutlineSave className="text-xl align-middle justify-self-center text-gray-500 hover:text-gray-800 hover:cursor-pointer" onClick={async () => await this.saveText()}/>
                </> : <>
                    <span className="flex flex-grow align-middle mr-2 justify-self-center">{this.state.text}</span>

                    <AiOutlineEdit className="text-xl align-middle justify-self-center text-gray-500 hover:text-gray-800 hover:cursor-pointer" onClick={() => this.setState({editing:true})
                    }/>


                </>}

            </div>
        </div>
    }
}

export default MiniEditor