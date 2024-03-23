import React from "react";
import { uploadAlbumPhoto, getPhotoAlbums, createPhotoAlbum } from "../../helpers/adminHelper";
import Loading from "../global/Loading";

const NO_PARALLEL_UPLOADS = 5;

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhotoAlbum: "",
            photoAlbums: null,
            albumName: "",
            albumAddress: "",
            album: undefined,
            uploading: false,
            progress: 0,
            skipped: "",
        };
    }

    async componentDidMount() {
        const photoAlbums = await getPhotoAlbums();
        this.setState({ photoAlbums: photoAlbums });
    }

    handleName = async (event) => {
        await this.setState({ albumName: event.target.value, selectedPhotoAlbum: "" });
    };

    selectPhotoAlbum = async (event) => {
        await this.setState({
            albumName: event.target.value,
            selectedPhotoAlbum: event.target.value,
        });
    };

    handleAddress = async (event) => {
        await this.setState({ albumAddress: event.target.value, album: event.target.files });
    };

    reset = async () => {
        await this.setState({
            uploading: false,
            progress: 0,
            albumAddress: "",
            albumName: "",
            album: undefined,
            skipped: "",
        });
    };

    uploadSingleImage = async (index) => {
        const image = this.state.album[index];
        if (
            image.type !== "image/jpeg" &&
            image.type !== "image/png" &&
            image.type !== "image/gif" &&
            image.type !== "image/tiff" &&
            image.type !== "image/webp"
        ) {
            await this.setState({
                skipped: this.state.skipped + "Skipped " + image.name + "\n",
            });
        } else {
            const filePromise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = async () => {
                    const body = {
                        imageName: this.state.album[index].name,
                        imageData: reader.result,
                        albumAddress: this.state.albumName,
                    };
                    const res = await uploadAlbumPhoto(body);
                    if (res === false) {
                        await this.setState({
                            skipped: this.state.skipped + "Failed " + image.name + " upload\n",
                        });
                    }
                    resolve();
                };
                reader.readAsDataURL(image);
            });

            await filePromise;
        }
        await this.setState({ progress: this.state.progress + 1 });
    };

    submitButton = async () => {
        await this.setState({ uploading: true });
        if (this.state.selectedPhotoAlbum === "") {
            await createPhotoAlbum({ name: this.state.albumName, date: new Date() });
        }
        let currentPromises = [];
        for (let i = 0; i < this.state.album.length; i++) {
            if (currentPromises.length < NO_PARALLEL_UPLOADS) {
                currentPromises.push(this.uploadSingleImage(i));
            } else {
                // Wait for one of the currently uploading images to complete
                // then remove from currentPromises and start uploading a new image.
                const [promiseToRemove] = await Promise.race(
                    currentPromises.map((p) => p.then(() => [p])),
                );
                currentPromises.splice(currentPromises.indexOf(promiseToRemove), 1);
                currentPromises.push(this.uploadSingleImage(i));
            }
        }
        await Promise.all(currentPromises);
        await this.setState({ progress: this.state.album.length });
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.uploading ? (
                    <div className="py-4">
                        <div className="flex-grow justify-center flex">
                            Uploading images - Do not close
                        </div>
                        <div className="flex-grow pt-2 justify-center flex">
                            Uploaded {this.state.progress} / {this.state.album.length} images.
                        </div>
                        <div className="flex-grow pt-2 justify-center flex">
                            {this.state.skipped}
                        </div>
                        {this.state.progress === this.state.album.length ? (
                            <>
                                <div className="flex-grow pt-2 justify-center flex">
                                    Upload Complete
                                </div>
                                <div className="flex-grow pt-2 justify-center flex">
                                    <button
                                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                                        onClick={this.reset}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Loading />
                        )}
                    </div>
                ) : (
                    <>
                        <div className="text-xl font-semibold">Upload an Album</div>
                        <label>
                            Album Name: Choose existing album to add to:
                            <select
                                defaultValue=""
                                value={this.state.selectedPhotoAlbum}
                                onChange={this.selectPhotoAlbum}
                                key="photoAlbums"
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option value="">Select Page</option>
                                {this.state.photoAlbums &&
                                    this.state.photoAlbums.map((photoAlbum, index) => {
                                        return (
                                            <option
                                                value={photoAlbum.name}
                                                key={"photoAlbum_" + index}
                                            >
                                                {photoAlbum.name}
                                            </option>
                                        );
                                    })}
                            </select>
                            <div>Or type a new album name:</div>
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="name"
                                type="text"
                                defaultValue={this.state.albumName}
                                value={this.state.albumName}
                                onChange={(event) => this.handleName(event)}
                            />
                        </label>

                        <div>Album Folder</div>
                        <div className="italic text-sm">
                            Select an unzipped folder of images. Images in subfolders will also be
                            uploaded
                        </div>
                        <label>
                            <input
                                className="mb-2 rounded border-2 border-slate-500"
                                name="poster"
                                type="file"
                                accept="image/*"
                                onChange={(event) => this.handleAddress(event)}
                                webkitdirectory="true"
                                /* eslint-disable-next-line react/no-unknown-property */
                                mozdirectory="true"
                                /* eslint-disable-next-line react/no-unknown-property */
                                directory="true"
                            />
                        </label>
                        <div></div>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            disabled={this.state.albumName === ""}
                            onClick={this.submitButton}
                        >
                            Upload Album
                        </button>
                    </>
                )}
            </div>
        );
    }
}

export default Photos;
