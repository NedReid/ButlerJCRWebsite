import React from "react";
import { updatePhotoAlbum, deletePhotoAlbum } from "../../helpers/adminHelper";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

class EditPhotoAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photoAlbum: props.photoAlbum };
    }

    handleChange = (event, type) => {
        this.state.photoAlbum[type] = event.target.value;
        console.log(this.state.photoAlbum);
    };

    handleBoolChange = (event, type) => {
        this.state.photoAlbum[type] = event.target.value === "true";
        console.log(this.state.photoAlbum);
    };

    submitButton = async () => {
        console.log(this.state.photoAlbum);
        await updatePhotoAlbum(this.state.photoAlbum);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    deleteButton = async () => {
        await deletePhotoAlbum(this.props.photoAlbum);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    handlePhotoAlbumDate = (date) => {
        this.state.photoAlbum.date = date;
    };

    render() {
        console.log("RENDERING");
        return (
            <>
                {" "}
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <div>
                        <b>WARNING:</b> Editing the album name will cause all previously shared
                        links to the album to break. Think carefully before editing the album name.
                    </div>
                    <label>
                        {" "}
                        Album Name:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="name"
                            type="text"
                            defaultValue={this.state.photoAlbum.name}
                            onChange={(event) => this.handleChange(event, "name")}
                        />
                    </label>
                    <label>
                        {" "}
                        Album Date:
                        <DateTimePicker
                            disableCalendar={true}
                            disableClock={true}
                            className="ml-2 mb-2"
                            minDate={new Date(2000, 1)}
                            maxDate={new Date(3000, 1)}
                            name="date"
                            value={this.state.photoAlbum.date}
                            onChange={this.handlePhotoAlbumDate}
                        />
                    </label>

                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Photo Album</h3>
                            <p className="py-4">
                                Are you sure you want to remove this photo album? This will also
                                delete all photos in the album from the website.
                            </p>
                            <div className="modal-action">
                                <label
                                    onClick={this.deleteButton}
                                    htmlFor="my-modal"
                                    className="btn"
                                >
                                    Yes
                                </label>
                                <label htmlFor="my-modal" className="btn">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.submitButton}
                >
                    Save photo album
                </button>
                <label
                    htmlFor="my-modal"
                    className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button"
                >
                    Delete photo album
                </label>
            </>
        );
    }
}

export default EditPhotoAlbum;
