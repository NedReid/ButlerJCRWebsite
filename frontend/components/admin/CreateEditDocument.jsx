import React from "react";
import {updateDocument, createDocument, deleteDocument} from '../../helpers/adminHelper';
import {documentModel} from "../../models/documentModel";
import {getDocumentTypeName, documentEnum} from "../../models/documentEnum";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

class CreateEditDocument extends React.Component {
    constructor(props) {

        super(props);
        this.state = {document: new documentModel(), file: ""};
        if (props.document !== undefined) {
            this.state = {document: new documentModel(props.document), file: ""}
        }
    }

    handleChange = (event, type) => {
        this.state.document[type] = event.target.value;
        console.log(this.state.document)
    }

    handleDateChange = (event) => {
        if (event !== null) {
            event.setHours(0, 0,0)
        }
        this.state.document.date = event;
    }

    handleNumChange= (event, type) => {
        this.state.document[type] = parseInt(event.target.value);
        console.log(this.state.document)
    }

    handleFile = async (event) => {
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.state.file = reader.result;
            this.state.document.address = file.name;
            console.log(this.state)
            this.forceUpdate();
        }
        reader.readAsDataURL(file);
    }

    submitButton = async () => {
        if (this.props.document !== undefined) {
            console.log(this.state.document)
            await updateDocument(this.state.document, this.state.file);
        }
        else {
            await createDocument(this.state.document, this.state.file);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }

    deleteButton = async () => {
        await deleteDocument(this.state.document);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab")
    }


    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.document.editors.length) {
            this.state.document.editors.push("");
        }
        while (num < this.state.document.editors.length) {
            this.state.document.editors.pop();
        }
        this.forceUpdate();
    }

    render() {
        console.log("RENDERING")
        return <> <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">

            <label> Document Name:
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                    name="name" type="text" defaultValue={this.state.document.name} onChange={(event) => this.handleChange(event, "name")}/>
            </label>

            <label>Document Category:</label>
            <select name="category" defaultValue={this.state.document.category} onChange={(event) => this.handleNumChange(event, "category")} className="select select-bordered w-full max-w-xs">
                {Object.values(documentEnum).map((documentCategory) => {
                    return <option value={documentCategory} key="documentType">{getDocumentTypeName(documentCategory)}</option>
                })}
            </select>

            <label> Document Date:
                <DateTimePicker disableCalendar={true} disableClock={true} className="ml-2 mb-2" format="dd/MM/y"
                                minDate={new Date(2000,1)} maxDate={new Date(3000,1)}
                                name="date" value={this.state.document.date} onChange={this.handleDateChange}
                />
            </label>

            <label>Document File (PDFs are accepted):
                <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                       name="file" type="file" accept="application/pdf" onChange={(event) => this.handleFile(event)}/>
                {this.state.document.address !== "" && (
                    <span>{this.state.document.address}</span>
                )}
            </label>




            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-700">Remove Document?!</h3>
                    <p className="py-4">Are you sure you want to remove this document?</p>
                    <div className="modal-action">
                        <label onClick={this.deleteButton} htmlFor="my-modal" className="btn">Yes</label>
                        <label htmlFor="my-modal" className="btn">No</label>
                    </div>
                </div>
            </div>

        </div>
            <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Submit Document</button>
            {this.props.document !== undefined && <label htmlFor="my-modal" className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button">Delete Document</label>}

        </>
    }

}

export default CreateEditDocument;