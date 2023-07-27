import React from 'react';
import {Carousel, Divider} from "react-daisyui";
import { getFolderAddresses } from "../../helpers/staticHelper";
import LatestPosts from "./LatestPosts";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {carouselPaths:[]}

    }

    async componentDidMount() {
        await this.setState({carouselPaths: await getFolderAddresses("/media/home/carousel/")})
        console.log(this.state.carouselPaths)
    }


    render() {
        <div className=" z-10 drop-shadow-2xl absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"></div>
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
            {this.state.carouselPaths.length >= 2 && <div className="w-full h-52 relative flex justify-center"><Carousel id="carousel" buttonStyle={buttonStyle} className="w-full h-52 absolute " display="sequential">
                {this.state.carouselPaths.map( (addr, index) => {
                    return <Carousel.Item role="option"  aria-label={"Photos of Butler College"}>
                        <img aria-label={"Photo of Butler College"} className="w-full object-cover" src={addr}/>
                    </Carousel.Item>
                    })}
            </Carousel>
            <div className="absolute text-center h-full flex flex-col justify-center">
            <div className="text-white text-3xl font-bold text-shadow-hv">Welcome to</div>
            <div className="text-white text-6xl font-bold text-shadow-hv">Butler JCR!</div>
            </div>
            </div>
            }
            <div className="mt-8 sm:flex p-1">
                <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:mr-4 mb-2">
                    <img alt="Photo of JCR President" className="" src="/media/home/president.webp"/>
                    <div className="w-full text-center mt-1 font-semibold text-grey-800">Urwah Mirza</div>
                    <div className="w-full text-center text-grey-800 italic">JCR President</div>
                </div>
                <div className="text-sm text-grey-900 w-full sm:w-2/3">
                                    Hello everyone! <br/><br/>
                I am Urwah Mirza, JCR President of Josephine Butler College, Durham University, and I would like to take this opportunity to welcome you all to our college. <br/><br/>
                    Our college is named after an incredible woman who was a social reformer and a powerful advocate for women's rights. She was truly ahead of her time.
                    We are also extremely proud of our college spirit. Our students are passionate about making a difference in the world, and we are always working to make our college a better place.
                Our college is home to a vibrant and friendly community of students, staff and alumni, and we are all proud to be part of the Butler College family.<br/><br/>
                We are committed to providing our students with an outstanding educational experience, and we offer a wide range of academic programmes and extracurricular activities.
                Our college is also situated in the beautiful city of Durham, which is home to a number of world-famous attractions.
                If you have any questions, please do not hesitate to contact me or any of the other members of the JCR Executive.<br/><br/>
                Thank you.
                </div>


            </div>

            <Divider/>


            <div className="mt-8 sm:flex p-1">

                <div className="text-sm text-grey-900 w-full sm:w-2/3">
                    Hello everyone, my name is Joseph Chesters and I am the Financial and Community Support Officer for Josephine Butler College JCR, Durham University.
                    I would like to take this opportunity to introduce you to our wonderful college and all of the amazing societies, sports, and committees that we have to offer. <br/><br/>
                    The college is situated in the heart of Durham City, just a short walk from the historic Durham Cathedral and the picturesque River Wear. We have around 500 students living in college, and our JCR is a vibrant and friendly community.<br/><br/>
                    We have an excellent academic record, and our students always achieve great things. We are also very proud of our extensive extracurricular activities, and there is always something going on at the college. We have a strong sporting tradition, and our students compete in a variety of different sports.
                    We also have a thriving music scene, and our college choir is always in demand.<br/><br/>
                    We are confident that you will enjoy your time at Josephine Butler College, and we very much look forward to welcoming you into our community.<br/><br/> Thank you.
                </div>
                <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:ml-4 mb-2">
                    <img alt="Photo of JCR FACSO" className="" src="/media/home/facso.webp"/>
                    <div className="w-full text-center mt-1 font-semibold text-grey-800">Joseph Chesters</div>
                    <div className="w-full text-center text-grey-800 italic">JCR FACSO</div>
                </div>

            </div>

            <Divider/>

            <div className="mt-8 sm:flex p-1">
                <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:mr-4 mb-2">
                    <img alt="Photo of Butler Mole" className="" src="/media/home/mole.webp"/>
                    <div className="w-full text-center mt-1 font-semibold text-grey-800">Butler Mole</div>
                    <div className="w-full text-center text-grey-800 italic">JCR Mascot</div>
                </div>
                <div className="text-sm text-grey-900 w-full sm:w-2/3">
                    Hello everyone! <br/><br/>
                    My name is Butler Mole and I am the Mascot of Josephine Butler College. I am a friendly, lovable mole who loves to have fun and make new friends. <br/><br/>
                    As the College Mascot, my job is to represent the students of Josephine Butler College and to promote college spirit. I attend all of the college's social events and help out with any college fundraisers. I also make appearances at Durham University's sporting events to support the team.<br/><br/>
                    I absolutely love my job and I feel very lucky to be a part of such a great college community. I would encourage all students, whether they are in Josephine Butler College or not, to get involved with their college's JCR. It's a great way to meet new people and have a lot of fun.<br/><br/>
                    There are many different types of animals that can be found around Durham University's campus. Some of these include: squirrels, rabbits, ducks, geese, and of course, moles! I encourage everyone to take the time to appreciate all of the different types of wildlife that can be found around Durham.<br/><br/>
                    Thank you all for your time and I hope to see you around campus soon!
                </div>

            </div>
            <LatestPosts types={["Weekly Email"]} text="Latest Posts"/>


        </div>

    }

}

export default Homepage;