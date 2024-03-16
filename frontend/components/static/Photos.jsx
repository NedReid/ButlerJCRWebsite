import React from 'react';
import {getAlbumFiles, getAlbums} from "../../helpers/staticHelper";
import Loading from "../global/Loading";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown, Modal} from "react-daisyui";

const SortByEnum = {
    BY_DATE_OLDEST_FIRST: "By date (oldest-newest)",
    BY_DATE_NEWEST_FIRST: "By date (newest-oldest)",
    BY_NAME_A_Z: "By name (A-Z)",
    BY_NAME_Z_A: "By name (Z-A)"
}

class PhotosComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {dateRanges: [], selectedDateFilter: null, albumPreviews: [], sortedAlbumPreviews: [], currentAlbum: "", albumPhotos: [], sortOrder: SortByEnum.BY_DATE_NEWEST_FIRST, photo: undefined}

    }

    async componentDidMount() {
        await this.setState({albumPreviews: await getAlbums()})
        let album = this.props.params["id"]
        if (album !== undefined) {
            await this.pickAlbum(album)
        }

    }

    pickAlbum = async (name) => {
        await this.setState({currentAlbum: name})
        const ap = await getAlbumFiles(name)
        console.log(ap)
        if (ap.length === 0) {
            this.props.navigate("/oh-no", {replace: true});
        }
        else {
            await this.setState({albumPhotos: ap})
        }

    }

    navigateToAlbum = async (name) => {
        this.props.navigate("/photos/" + name, {replace: false})
        await this.pickAlbum(name)
    }

    getYearsFromDates = () => {
        const years = this.state.albumPreviews.map((albumPreview) => new Date(albumPreview.date)).sort((a, b) => b - a).map((albumDate) => {
            const albumYear = albumDate.getFullYear()
            if (albumDate.getMonth() < 8) {
                return {name: `${albumYear - 1}/${albumYear}`, startDate: new Date(albumYear - 1, 8), endDate: new Date(albumYear, 8)}
            }
            return {name: `${albumYear}/${albumYear + 1}`, startDate: new Date(albumYear, 8), endDate: new Date(albumYear + 1, 8)}
        })
        return years.filter((year, index) => index === years.findIndex(otherYear => otherYear.name === year.name))
    }

    componentDidUpdate (prevProps, prevState) {
        console.log(this.state.sortedAlbumPreviews)
        if (prevState.albumPreviews === this.state.albumPreviews && prevState.sortOrder === this.state.sortOrder && prevState.selectedDateFilter === this.state.selectedDateFilter) {
            return
        }

        const sortOrder = this.state.sortOrder
        const albumPreviews = this.state.albumPreviews
        const dateRanges = this.getYearsFromDates()
        this.setState({dateRanges})

        const selectedDateFilter = this.state.selectedDateFilter
        const filteredAlbumPreviews = this.state.selectedDateFilter? this.state.albumPreviews.filter((albumPreview) =>{
            const albumDate = new Date (albumPreview.date)
            return albumDate < selectedDateFilter.endDate && albumDate >= selectedDateFilter.startDate
        }) : albumPreviews


        switch(sortOrder) {
            case SortByEnum.BY_DATE_NEWEST_FIRST:
                this.setState({sortedAlbumPreviews: filteredAlbumPreviews.sort((a, b) => new Date(b.date) - new Date(a.date))})
                return
            case SortByEnum.BY_DATE_OLDEST_FIRST:
                this.setState({sortedAlbumPreviews: filteredAlbumPreviews.sort((a, b) => new Date(a.date) - new Date(b.date))})
                return
            case SortByEnum.BY_NAME_Z_A:
                this.setState({sortedAlbumPreviews: filteredAlbumPreviews.sort((a, b) => b.name < a.name? - 1 : 1)})
                return
            default:
                this.setState({sortedAlbumPreviews: filteredAlbumPreviews.sort((a, b) => a.name < b.name? - 1 : 1)})
        }
    }



    render() {
        return <div className="flex text-center flex-col w-full justify-center place-items-center mb-16">
                <div className="my-4 text-4xl font-semibold">Photos</div>
                {this.state.currentAlbum.length === 0?
                    <>
                        <div className="flex flex-col sm:flex-row">
                            <Dropdown className="mx-2 w-56" horizontal="center">
                                <Dropdown.Toggle className="w-56"><div className="w-48">{this.state.sortOrder}</div></Dropdown.Toggle>
                                <Dropdown.Menu className="w-56">
                                    <Dropdown.Item className="bg-gray-100" onClick={() => this.setState({sortOrder: SortByEnum.BY_DATE_NEWEST_FIRST})}>{SortByEnum.BY_DATE_NEWEST_FIRST}</Dropdown.Item>
                                    <Dropdown.Item className="bg-gray-100" onClick={() => this.setState({sortOrder: SortByEnum.BY_DATE_OLDEST_FIRST})}>{SortByEnum.BY_DATE_OLDEST_FIRST}</Dropdown.Item>
                                    <Dropdown.Item className="bg-gray-100" onClick={() => this.setState({sortOrder: SortByEnum.BY_NAME_A_Z})}>{SortByEnum.BY_NAME_A_Z}</Dropdown.Item>
                                    <Dropdown.Item className="bg-gray-100" onClick={() => this.setState({sortOrder: SortByEnum.BY_NAME_Z_A})}>{SortByEnum.BY_NAME_Z_A}</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            {this.state.dateRanges &&
                                <Dropdown className="mx-2 w-56" horizontal="center">
                                    <Dropdown.Toggle className="w-56"><div className="w-48">Filtering {this.state.selectedDateFilter? this.state.selectedDateFilter.name : ""}</div></Dropdown.Toggle>
                                    <Dropdown.Menu className="w-56">
                                        <Dropdown.Item className="bg-gray-100" onClick={() => this.setState({selectedDateFilter: null})}>All</Dropdown.Item>
                                        {
                                            this.state.dateRanges.map((dateRange, index) =>
                                                <Dropdown.Item key={index} className="bg-gray-100" onClick={() => this.setState({selectedDateFilter: dateRange})}>{dateRange.name}</Dropdown.Item>
                                            )
                                        }
                                    </Dropdown.Menu>

                                </Dropdown>
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                            {(this.state.sortedAlbumPreviews.length > 0 && this.state.sortedAlbumPreviews.map(album => {
                                return <div
                                    key={album._id}
                                    className="hover:cursor-pointer hover:bg-slate-50 active:bg-slate-200 hover:shadow hover:animate-pingOnce w-64 h-80 m-4 border-2 rounded text-center"
                                    onClick={async () => await this.navigateToAlbum(album.name)}>
                                    <img className="object-cover w-64 h-64"
                                         src={"/files/albumsPreview/" + album.name + "/" + album.path}/>
                                    {album.name}
                                </div>
                            }))}
                        </div>
                    </>
                    :
                    <div>
                        <div className="flex mb-4">
                            <button className="hover:bg-gray-200 w-8 h-8 my-auto mr-2 font-bold text-2xl"
                                    onClick={() => this.props.navigate("/photos")}>{"<"}</button>
                            <div className="my-4 text-2xl font-semibold">{this.state.currentAlbum}</div>
                        </div>
                        {(this.state.albumPhotos.length > 0 ?
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                    {(this.state.albumPhotos.map((photo, index) => {
                                        return <div key={index} className="group relative w-64 h-64 hover:cursor-pointer" onClick={() => this.setState({photo: index})}>
                                    <img className="object-cover w-64 h-64" src={"/files/albumsPreview/" + this.state.currentAlbum + "/" + photo + ".webp"}/>
                                    <div className="z-10 hidden group-hover:block absolute -left-8 -top-8 w-80 h-80">
                                        <img className="object-cover w-80 h-80" src={"/files/albumsPreview/" + this.state.currentAlbum + "/" + photo + ".webp"}/>
                                    </div>
                                </div>
                            }))}
                        </div>
                    :
                        <Loading/>
                    )}
                    </div>
                }

            <Modal className="w-5/6 max-w-4xl h-fit" open={this.state.photo !== undefined} onClickBackdrop={() => this.setState({photo: undefined})}>
                <Modal.Body>
                    <div className="w-full relative">
                        <img className="w-full max-h-[70vh] object-contain relative"
                             src={"/files/albums/" + this.state.currentAlbum + "/" + this.state.albumPhotos[this.state.photo]}>
                        </img>
                        {this.state.photo > 0 &&
                        <div className="hover:cursor-pointer absolute inset-y-0 left-0 bg-gray-700 bg-opacity-40 hover:bg-opacity-70 px-4 text-3xl flex flex-col justify-center items-center text-white" onClick={() => this.setState({photo: this.state.photo - 1})}>{"<"}</div>
                        }
                        {this.state.photo < this.state.albumPhotos.length -1 &&
                        <div className="hover:cursor-pointer absolute inset-y-0 right-0 bg-gray-700 bg-opacity-40 hover:bg-opacity-70 px-4 text-3xl flex flex-col justify-center items-center text-white" onClick={() => this.setState({photo: this.state.photo + 1})}>{">"}</div>
                        }

                    </div>

                </Modal.Body>
            </Modal>


        </div>

    }

}

const Photos = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <PhotosComponent {...props} params={params} navigate={navigate} />;
}

export default Photos