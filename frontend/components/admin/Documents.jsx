import React from 'react';
import {getDocuments} from "../../helpers/adminHelper";
import CreateEditDocument from "./CreateEditDocument";



class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingDocument: false, documents: [], currentDocument: undefined};
    }

    async componentDidMount(){
        const documents = await getDocuments()
        this.setState({documents: documents});
        console.log(documents);
    }

    editDocument = (event) => {
        const currentDocument = this.state.documents.find(document => {
            return document._id === event.target.value;
        });
        console.log(currentDocument)
        this.setState({currentDocument: currentDocument});
    }

    onUpdated = async () => {
        this.currentDocument = undefined;
        this.setState({documents: []})
        const documents = await getDocuments()
        this.setState({documents: documents});
    }

    onCreated = async () => {
        this.setState({addingDocument: false});
        this.setState({documents: []})
        const documents = await getDocuments()
        this.setState({documents: documents});
    }

    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {this.state.addingDocument === false &&
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingDocument: true})}}>Add Document</button>
            }
            {this.state.addingDocument === true && <>
                <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={() => {this.setState({addingDocument: false})}}>Cancel</button>
                <CreateEditDocument closeTab={this.onCreated}/>
            </>}
            <br/>
            Edit Current Documents:
            <br/>

            <select defaultValue="" onChange={this.editDocument} key="documents" className="select select-bordered w-full max-w-xs">
                <option value="">Select Document</option>
                {this.state.documents.map((document, index) => {
                    return (
                        <option value={document._id} key={"document_" + index}>{document.name}</option>

                    );
                })}
            </select>
            <br/>
            {this.state.currentDocument !== undefined && this.state.documents.map((document, index) =>{
                if(document === this.state.currentDocument) {
                    return <CreateEditDocument closeTab={this.onUpdated} key={index} document={this.state.currentDocument}/>
                }
            })}
        </div>
    }

}

export default Documents;