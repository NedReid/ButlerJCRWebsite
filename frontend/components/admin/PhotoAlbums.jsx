import React from 'react';
import {getPhotoAlbums} from "../../helpers/adminHelper";
import EditPhotoAlbum from "./EditPhotoAlbum";

class PhotoAlbums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {photoAlbums: [], currentPhotoAlbum: undefined, dateRanges: [], currentDateFilter: null};
    }

    async componentDidMount(){
        const photoAlbums = await getPhotoAlbums()
        const dateRanges = this.getYearsFromDates(photoAlbums)
        this.setState({photoAlbums, dateRanges});
    }

    editPhotoAlbum = (event) => {
        const currentPhotoAlbum = this.state.photoAlbums.find(photoAlbum => {
            return photoAlbum._id === event.target.value;
        });
        this.setState({currentPhotoAlbum});
    }

    onUpdated = async () => {
        console.log("setting current date filter to null")
        this.setState({photoAlbums: [], dateRanges: [], currentPhotoAlbum: undefined, currentDateFilter: null})
        const photoAlbums = await getPhotoAlbums()
        const dateRanges = this.getYearsFromDates(photoAlbums)
        this.setState({photoAlbums, dateRanges});
    }

    getYearsFromDates = (photoAlbums) => {
        const years = photoAlbums.map((photoAlbum) => new Date(photoAlbum.date)).sort((a, b) => b - a).map((albumDate) => {
            const albumYear = albumDate.getFullYear()
            if (albumDate.getMonth() < 8) {
                return {name: `${albumYear - 1}/${albumYear}`, startDate: new Date(albumYear - 1, 8), endDate: new Date(albumYear, 8)}
            }
            return {name: `${albumYear}/${albumYear + 1}`, startDate: new Date(albumYear, 8), endDate: new Date(albumYear + 1, 8)}
        })
        return years.filter((year, index) => index === years.findIndex(otherYear => otherYear.name === year.name))
    }


    render() {
        return <div className="my-2 p-2 rounded border-2 border-amber-500">
            <br/>
            Edit current photo albums:
            <br/>

            <select defaultValue={null} value={this.state.currentDateFilter === null? null : this.state.dateRanges.indexOf(this.state.currentDateFilter)} onChange={(event) => this.setState({currentDateFilter: event.target.value === null ? null: this.state.dateRanges[event.target.value]})} key="photoAlbumYear" className="select select-bordered w-full max-w-xs">
                <option value={null}>Select year</option>
                {this.state.dateRanges.map((dateRange, index) => {
                    return (
                        <option value={index} key={"dateRange_" + index}>{dateRange.name}</option>
                    );
                })}
            </select>
            <br/>
            {this.state.currentDateFilter &&
            <select defaultValue="" onChange={this.editPhotoAlbum} key="photoAlbum" className="select select-bordered w-full max-w-xs">
                <option value="">Select Photo Album</option>
                {this.state.photoAlbums.filter((photoAlbum) =>{
                    const albumDate = new Date (photoAlbum.date)
                    return albumDate < this.state.currentDateFilter.endDate && albumDate >= this.state.currentDateFilter.startDate
                }).map((photoAlbum, index) => {
                    return (
                        <option value={photoAlbum._id} key={"photoAlbum_" + index}>{photoAlbum.name}</option>

                    );
                })}
            </select>
            }
            <br/>
            {this.state.currentPhotoAlbum !== undefined && this.state.photoAlbums.map((photoAlbum, index) =>{
                if(photoAlbum === this.state.currentPhotoAlbum) {
                    return <EditPhotoAlbum closeTab={this.onUpdated} key={index} photoAlbum={this.state.currentPhotoAlbum}/>
                }
            })}
        </div>
    }

}

export default PhotoAlbums;