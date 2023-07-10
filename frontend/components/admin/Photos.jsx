import React from 'react';
import {getRoles, getMembersExcel, addMemberList, uploadAlbumPhoto} from '../../helpers/adminHelper';
import CreateEditRole from './CreateEditRole';
import {roleCategoryEnum, roleCategoryNames, meetingEnum, methodEnum} from "../../models/roles/roleEnums";
import { Textarea, Checkbox } from "react-daisyui";
import MemberTable from "./MemberTable";
import TextEditor from "../global/TextEditor";
import Loading from "../global/Loading";

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {albumName: "", albumAddress: "", album: undefined, uploading: false, progress: 0, skipped: ""};
    }

    handleName = async (event) => {
        await this.setState({albumName: event.target.value})
    }
    handleAddress = async (event) => {
        await this.setState({albumAddress: event.target.value, album: event.target.files})
        console.log(event.target.files)
    }

    reset = async (event) => {
        await this.setState({uploading: false, progress: 0, albumAddress: "", albumName: "", album: undefined, skipped: ""})
    }

    submitButton = async (event) => {
        await this.setState({uploading: true})
        for (let i = 0; i < this.state.album.length; i++) {
            await this.setState({progress: i})
            const image = this.state.album[i];
            if ((image.type !== "image/jpeg") && (image.type !== "image/png") && (image.type !== "image/gif") && (image.type !== "image/tiff") && (image.type !== "image/webp")) {
                await this.setState({skipped: this.state.skipped + "Skipped " + image.name + "\n"});
            }
            else {
                const filePromise = new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        console.log(this.state.album[i].name)
                        const body = {imageName: this.state.album[i].name, imageData: reader.result, albumAddress: this.state.albumName}
                        const res = await uploadAlbumPhoto(body)
                        if (res === false) {
                            await this.setState({skipped: this.state.skipped + "Failed " + image.name + " upload\n"});
                        }
                        resolve()
                    }
                    reader.readAsDataURL(image);
                });

                await filePromise
            }
            await this.setState({progress: this.state.album.length})
        }
    }


    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            {
                this.state.uploading?
                    <div className="py-4">
                        <div className="flex-grow justify-center flex">Uploading images - Do not close</div>
                        <div className="flex-grow pt-2 justify-center flex">Uploaded {this.state.progress} / {this.state.album.length} images.</div>
                        <div className="flex-grow pt-2 justify-center flex">{this.state.skipped}</div>
                        { this.state.progress === this.state.album.length?
                            <>
                                <div className="flex-grow pt-2 justify-center flex">Upload Complete</div>
                                <div className="flex-grow pt-2 justify-center flex">
                                    <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.reset}>Continue</button>
                                </div>
                            </>
                            :
                        <Loading/>
                        }
                    </div>
                    :
                    <>
                        <div className="text-xl font-semibold">Upload an Album</div>
                        <label>Album Name:
                            <input className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                   name="name" type="text" defaultValue={this.state.albumName} onChange={(event) => this.handleName(event)}/>
                        </label>

                        <div>Album Folder</div>
                        <div className="italic text-sm">Select an unzipped folder of images. Images in subfolders will also be uploaded</div>
                        <label>
                            <input className="mb-2 rounded border-2 border-slate-500"
                                   name="poster" type="file" accept="image/*" onChange={(event) => this.handleAddress(event)} webkitdirectory="true" mozdirectory="true" directory="true"/>
                        </label>
                        <div></div>
                        <button className="bg-amber-400 rounded p-2 transition hover:bg-amber-600" onClick={this.submitButton}>Upload Album</button>
                    </>
            }

        </div>
    }

}

export default Photos;