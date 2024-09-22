import React from "react";
import { Carousel } from "react-daisyui";
import { getFolderAddresses } from "../../helpers/staticHelper";
import Editable from "../global/Editable";
import { Link } from "react-router-dom";
import EditablePage from "../global/EditablePage";

class FreshersHomepage extends EditablePage {
    constructor(props) {
        super(props);
        this.state = {
            carouselPaths: [],
            editables: "waiting",
            editor: false,
            editing: false,
            page: "freshers",
        };
    }

    async componentDidMount() {
        await this.setState({
            carouselPaths: await getFolderAddresses("/media/freshers/carousel/"),
        });
        super.componentDidMount();
    }

    render() {
        <div className=" z-10 drop-shadow-2xl absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"></div>;
        const buttonStyle = (value) => {
            console.log(value);
            if (value === "❮") {
                return (
                    <button className="z-10 text-white/50 bg-slate-800/50 w-12 h-12 -translate-x-5 hover:bg-slate-800/75">
                        {value}
                    </button>
                );
            } else {
                return (
                    <button className="z-10 text-white/50 bg-slate-800/50 w-12 h-12 translate-x-5 hover:bg-slate-800/75">
                        {value}
                    </button>
                );
            }
        };

        return this.renderOnLoad(
            <div>
                {this.state.carouselPaths.length >= 2 && (
                    <div className="w-full h-52 relative flex justify-center">
                        <Carousel
                            buttonStyle={buttonStyle}
                            className="w-full h-52 absolute "
                            display="sequential"
                        >
                            {this.state.carouselPaths.map((addr, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img className="w-full object-cover" src={addr} />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                        <div className="absolute text-center h-full flex flex-col justify-center">
                            <div className="text-white text-4xl font-bold text-shadow-hv">
                                Welcome {new Date().getFullYear()} Freshers!
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 mt-4">
                    <div className="col-span-2 py-2 md:py-0 md:pr-2">
                        <Editable
                            updateEditable={this.updateEditable}
                            className="h-8"
                            page={this.state.page}
                            editables={this.state.editables}
                            name="desc"
                            editing={this.state.editing}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="italic text-grey-800 mt-4">
                            Any questions about freshers?!? Go to our FAQ!
                        </div>
                        <Link to="/freshers/faq" className="hover:brightness-75 transition-all">
                            <img
                                className="rounded-lg border-2 border-red-900 max-w-[250px] m-4"
                                src="/media/freshers/faq.jpg"
                            />
                        </Link>

                        <div className="italic text-grey-800 mt-4">
                            Wondering what freshers week entails? Check our our schedule!
                        </div>
                        <Link
                            to="/freshers/schedule"
                            className="hover:brightness-75 transition-all"
                        >
                            <img
                                className="rounded-lg border-2 border-red-900 max-w-[250px] m-4"
                                src="/media/freshers/schedule.jpg"
                            />
                        </Link>

                        <div className="grow"></div>
                    </div>
                </div>
            </div>,
        );
    }
}

export default FreshersHomepage;
