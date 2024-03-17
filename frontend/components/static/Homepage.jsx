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
                            Daniel Stuart
                        </div>
                        <div className="w-full text-center text-grey-800 italic">JCR President</div>
                    </div>
                    <div className="text-sm text-grey-900 w-full sm:w-2/3">
                        Hello everyone! <br />
                        <br />
                        {`I'm`} Daniel Stuart and I’m delighted to be the current JCR President of
                        Josephine Butler College. <br />
                        <br />
                        Named after Josephine Butler, an incredible social reformer and advocate for
                        women’s rights, we are a thriving and bustling community with a strong
                        college spirit and our students at the heart of everything that we do. We’re
                        incredibly proud to have such a diverse and welcoming group of students,
                        staff, and alumni who are all integral in making Butler such a great college
                        and JCR. <br />
                        <br />
                        We aim to offer a range of high-quality extra-curricular activities
                        including sports, societies, committees, and events such as Winter and
                        Summer Ball, Josephine Butler Charity Showcase, and Butler Day. We’re also
                        immensely proud of our students’ continued academic achievements and
                        contributions to the wider university. <br />
                        <br />
                        If you have any questions, please don’t hesitate to contact us!
                    </div>
                </div>

                <Divider />

                <div className="mt-8 sm:flex p-1">
                    <div className="text-sm text-grey-900 w-full sm:w-2/3">
                        Hi everyone, <br />
                        <br />
                        My name is Arman Huq and I am your Financial and Community Support Officer
                        (FACSO) for this year. I am one of the two JCR sabbatical officers and I’ll
                        be working alongside Daniel, the JCR president to deliver an exceptional
                        experience to all our students and JCR members. <br />
                        <br />
                        If you have any questions feel free to ask, or just pop by our office!
                    </div>
                    <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:ml-4 mb-2">
                        <img alt="Photo of JCR FACSO" className="" src="/media/home/facso.webp" />
                        <div className="w-full text-center mt-1 font-semibold text-grey-800">
                            Arman Huq
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
