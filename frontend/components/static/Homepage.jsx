import React from "react";
import { Carousel, Divider } from "react-daisyui";
import { getFolderAddresses } from "../../helpers/staticHelper";
import LatestPosts from "./LatestPosts";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { carouselPaths: [] };
    }

    async componentDidMount() {
        await this.setState({ carouselPaths: await getFolderAddresses("/media/home/carousel/") });
        console.log(this.state.carouselPaths);
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

        return (
            <div>
                {this.state.carouselPaths.length >= 2 && (
                    <div className="w-full h-52 relative flex justify-center">
                        <Carousel
                            id="carousel"
                            buttonStyle={buttonStyle}
                            className="w-full h-52 absolute "
                            display="sequential"
                        >
                            {this.state.carouselPaths.map((addr, index) => {
                                return (
                                    <Carousel.Item
                                        key={index}
                                        role="option"
                                        aria-label={"Photos of Butler College"}
                                    >
                                        <img
                                            aria-label={"Photo of Butler College"}
                                            className="w-full object-cover"
                                            src={addr}
                                        />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                        <div className="absolute text-center h-full flex flex-col justify-center">
                            <div className="text-white text-3xl font-bold text-shadow-hv">
                                Welcome to
                            </div>
                            <div className="text-white text-6xl font-bold text-shadow-hv">
                                Butler JCR!
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-8 sm:flex p-1">
                    <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:mr-4 mb-2">
                        <img
                            alt="Photo of JCR President"
                            className=""
                            src="/media/home/president.webp"
                        />
                        <div className="w-full text-center mt-1 font-semibold text-grey-800">
                            Hazel Cheung
                        </div>
                        <div className="w-full text-center text-grey-800 italic">JCR President</div>
                    </div>
                    <div className="text-sm text-grey-900 w-full sm:w-2/3">
                        {`Hi everyone! I’m Hazel, your JCR pres. for 2024-2025! I recently graduated from studying BA Education Studies with Psychology here at Durham.`}
                        <br />
                        <br />
                        {`As JCR president, my role is to oversee the common room for all undergraduates, alongside the Finance and Community Support Officer (FACSO) Ben! My aim for the year is to ensure that all students, whether new or returning, benefit as much as possible from the range of student experiences available at college.`}
                        <br />
                        <br />
                        {`We have a range of events, activities, and support systems in place to help you feel integrated and make your college experience memorable. Whether you’re interested in sports, arts, community service, or just making new friends, there is something for everyone.`}
                        <br />
                        <br />
                        {`We promote inclusivity and diversity through cultural events and welfare campaigns to create a welcoming environment. Our activities celebrate various traditions, languages, and histories, fostering mutual respect and understanding in our community for a more inclusive society.`}
                        <br />
                        <br />
                        {`Finally, remember that the JCR is here for you. If you have any ideas, concerns, or just need a chat, don’t hesitate to reach out. We’re excited for the year ahead and look forward to making it an unforgettable experience for all Butler students`}
                    </div>
                </div>

                <Divider />

                <div className="mt-8 sm:flex p-1">
                    <div className="text-sm text-grey-900 w-full sm:w-2/3">
                        {`Hello! I’m Ben and I am your FACSO for this academic year! I recently graduated from Geography.`}
                        <br />
                        <br />
                        {`FACSO stands for Finance and Community Support Officer which is exactly what my job is. I handle the financial side of the common room as well as providing support to the many clubs, societies and sports we have, to ensure their individual smooth operation!`}
                        <br />
                        <br />
                        {`My role involves budget management, ensuring that all expenditures are accounted for and that our financial resources are optimally allocated. I also liaise with various club leaders to understand their needs and provide them with the necessary tools and guidance to thrive. Whether it's helping to organise events, securing funding, or offering advice, my goal is to encourage a vibrant and inclusive community where everyone feels supported.`}
                        <br />
                        <br />
                        {`Feel free to reach out to me via email if you have any questions or need assistance with anything related to finance or community support. I'm here to help!`}
                    </div>
                    <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:ml-4 mb-2">
                        <img alt="Photo of JCR FACSO" className="" src="/media/home/facso.webp" />
                        <div className="w-full text-center mt-1 font-semibold text-grey-800">
                            Ben Prior
                        </div>
                        <div className="w-full text-center text-grey-800 italic">JCR FACSO</div>
                    </div>
                </div>

                <Divider />

                <div className="mt-8 sm:flex p-1">
                    <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:mr-4 mb-2">
                        <img alt="Photo of Butler Mole" className="" src="/media/home/mole.webp" />
                        <div className="w-full text-center mt-1 font-semibold text-grey-800">
                            Butler Mole
                        </div>
                        <div className="w-full text-center text-grey-800 italic">JCR Mascot</div>
                    </div>
                    <div className="text-sm text-grey-900 w-full sm:w-2/3">
                        Hello everyone! <br />
                        <br />
                        My name is Butler Mole and I am the Mascot of Josephine Butler College. I am
                        a friendly, lovable mole who loves to have fun and make new friends. <br />
                        <br />
                        As the College Mascot, my job is to represent the students of Josephine
                        Butler College and to promote college spirit. I attend all of the college
                        {`'s`} social events and help out with any college fundraisers. I also make
                        appearances at Durham University{`'s`} sporting events to support the team.
                        <br />
                        <br />I absolutely love my job and I feel very lucky to be a part of such a
                        great college community. I would encourage all students, whether they are in
                        Josephine Butler College or not, to get involved with their college{`'s`}{" "}
                        JCR. It{`'s`} a great way to meet new people and have a lot of fun.
                        <br />
                        <br />
                        There are many different types of animals that can be found around Durham
                        University{`'s`} campus. Some of these include: squirrels, rabbits, ducks,
                        hedgehogs, and of course, moles! I encourage everyone to take the time to
                        appreciate all of the different types of wildlife that can be found around
                        Durham.
                        <br />
                        <br />
                        Thank you all for your time and I hope to see you around campus soon!
                    </div>
                </div>
                <LatestPosts types={["Weekly Email"]} text="Latest Posts" />
            </div>
        );
    }
}

export default Homepage;
