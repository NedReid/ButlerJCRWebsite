import React from 'react';
import {Carousel, Divider} from "react-daisyui";
import {getFolderAddresses, getPageEditables, updatePageEditables} from "../../helpers/staticHelper";
import LatestPosts from "../static/LatestPosts";
import Editable from "../global/Editable";
import {AiFillEdit, AiFillSave} from "react-icons/ai";
import {Link} from "react-router-dom";

class FreshersHomepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {carouselPaths:[], editables: "waiting", editor: false, editing: false, page: "freshers"}

    }

    async componentDidMount() {
        await this.setState({carouselPaths: await getFolderAddresses("/media/freshers/carousel/")})
        console.log(this.state.carouselPaths)
        let res = await getPageEditables(this.state.page)
        console.log("ARHG")
        console.log(res)
        await this.setState({editables: res.editables, editor: res.editor})
    }

    updateEditable = (editable) => {
        let initEd = this.state.editables.findIndex(ed => ed.name === editable.name)

        if (initEd >= 0) {
            this.state.editables[initEd] = editable
        }
        else {
            this.state.editables.push(editable);
        }
    }

    onChange = async () => {
        if (this.state.editing) {
            await updatePageEditables(this.state.page, this.state.editables)
        }
        this.setState({editing: !this.state.editing})
    }



    render() {
        <div className=" z-10 drop-shadow-2xl absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"></div>
        console.log("beans", this.state)
        const buttonStyle = (value) => {
            console.log(value)
            if (value === "❮")
            {
                return <button className="z-10 text-white/50 bg-slate-800/50 w-12 h-12 -translate-x-5 hover:bg-slate-800/75">{value}</button>
            }
            else
            {
                return <button className="z-10 text-white/50 bg-slate-800/50 w-12 h-12 translate-x-5 hover:bg-slate-800/75">{value}</button>
            }
        }

        return <div>
            {this.state.carouselPaths.length >= 2 && <div className="w-full h-52 relative flex justify-center"><Carousel buttonStyle={buttonStyle} className="w-full h-52 absolute " display="sequential">
                {this.state.carouselPaths.map( (addr) => {
                    return <Carousel.Item>
                        <img className="w-full object-cover" src={addr}/>
                    </Carousel.Item>
                    })}
            </Carousel>
            <div className="absolute text-center h-full flex flex-col justify-center">
                <div className="text-white text-4xl font-bold text-shadow-hv">Welcome {(new Date()).getFullYear()} Freshers!</div>
            </div>
            </div>
            }

            {(this.state.editables !== "waiting") &&

                <div className="relative">
                    {this.state.editor && <button className={"z-30 btn btn-circle absolute top-0 right-0 m-2 swap swap-rotate " + (this.state.editing? "swap-active": "")} onClick={this.onChange}>
                        <AiFillSave className="swap-on text-white text-3xl"></AiFillSave>
                        <AiFillEdit className="swap-off text-white text-3xl"></AiFillEdit>
                    </button>}
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
                        <div className="col-span-2 py-2 md:py-0 md:pr-2">
                            <Editable updateEditable={this.updateEditable}  className="h-8" page={this.state.page} editables={this.state.editables} name="desc" editing={this.state.editing}/>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="italic text-grey-800 mt-4">Any questions about freshers?!? Go to our FAQ!</div>
                            <Link to="/freshers/faq" className="hover:brightness-75 transition-all">
                                <img className="rounded-lg border-2 border-red-900 max-w-[250px] m-4" src="/media/freshers/faq.jpg" />
                            </Link>

                            <div className="italic text-grey-800 mt-4">Wondering what freshers week entails? Check our our schedule!</div>
                            <Link to="/freshers/schedule" className="hover:brightness-75 transition-all">
                                <img className="rounded-lg border-2 border-red-900 max-w-[250px] m-4" src="/media/freshers/schedule.jpg" />
                            </Link>

                            <div className="grow"></div>

                        </div>
                    </div>
                </div>}

        </div>
    }

}

export default FreshersHomepage;