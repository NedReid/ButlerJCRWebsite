import React from 'react';
import {Carousel, Divider} from "react-daisyui";
import { getFolderAddresses } from "../../helpers/staticHelper";
import LatestPosts from "../static/LatestPosts";

class MCRHomepage extends React.Component {
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
            {this.state.carouselPaths.length >= 2 && <div className="w-full h-52 relative flex justify-center"><Carousel buttonStyle={buttonStyle} className="w-full h-52 absolute " display="sequential">
                {this.state.carouselPaths.map( (addr) => {
                    return <Carousel.Item>
                        <img className="w-full object-cover" src={addr}/>
                    </Carousel.Item>
                    })}
            </Carousel>
            <div className="absolute text-center h-full flex flex-col justify-center">
            <div className="text-white text-3xl font-bold text-shadow-hv">Welcome to</div>
            <div className="text-white text-6xl font-bold text-shadow-hv">Butler MCR!</div>
            </div>
            </div>
            }
            <div className="mt-8 sm:flex p-1">
                <div className="w-1/2 sm:w-1/3 translate-x-1/2 sm:translate-x-0 sm:mr-4 mb-2">
                    <img className="" src="/media/home/mcrpresident.webp"/>
                    <div className="w-full text-center mt-1 font-semibold text-grey-800">Molly Knox</div>
                    <div className="w-full text-center text-grey-800 italic">MCR President</div>
                </div>
                <div className="text-sm text-grey-900 w-full sm:w-2/3">
                    Hello and welcome to Josephine Butler College’s MCR.<br/><br/>

                    My name is Molly Knox and I am the Middle Common Room (MCR) President for 2023-24. I have recently
                    graduated with a BA in Music, and am currently studying for an MA in Ethnomusicology. I am very
                    excited to welcome you to our college and MCR community. The MCR is a space for postgraduate
                    students at Butler, and being a part of it enables you to access a range of societies, committees,
                    and welfare oriented and formal events throughout your time here. As part of the MCR, we also have a
                    lounge which is a dedicated space for you to study, relax and socialise with those in Butler’s
                    postgraduate community. <br/><br/>

                    As a Postgrad at Durham you will be at the heart of a gorgeous and historic city leading the way in
                    academic research and teaching. There’s always something to do, and a new and exciting opportunity
                    around every corner. Durham University, and the city in general, boast a lively culture and arts
                    scene, with lots of societies and events to get involved in. Durham even hosts Lumiere, a free to
                    attend light festival, every other November. There’s a great deal of places to explore in the city
                    itself such as our landmark castle and cathedral, and Durham’s surrounding areas. The variety of
                    river walks in the city centre, Finchale Priory, and Old Durham Gardens are a particular favourite
                    of mine, along with nearby coastal towns in the North East.<br/><br/>

                    Josephine Butler is a wonderful and friendly college in Durham with a ton of green space and lots
                    to get involved with. We are named after feminist pioneer and reformer, Josephine Butler, and
                    bolster values of inclusivity, approachability, and environmental awareness. We are a gowned
                    college (meaning we wear formal gowns to events like regular formal dinners and matriculation),
                    despite being relatively new in the Durham University collegiate landscape (founded in 2006).
                    Our accommodation is modern, self-catered, ensuite, and backs on to the beautiful Durham Botanical
                    Gardens! A lovely personal favourite spot for a read, picnic, or picturesque walk. Our college bar
                    is also a hub of socialising and activity- being one of the largest of Durham’s college bars, and
                    hosting many student bands at formal and bar events throughout the academic calendar. <br/><br/>

                    Josephine Butler College’s motto is “Comme je trouve”, meaning “As we find” in French, which
                    relates to our proactive and optimistic outlook as a college community. We make the most of the
                    opportunities being part of the college has to offer, and are unafraid to give things a go to the
                    best of our ability. I hope that when you come to Butler, you will find the college to be just as
                    exciting and welcoming as I have found it during my time at Durham.<br/><br/>

                    If you have any questions, queries, or ideas, feel free to get in touch over email at <a className="underline text-blue-700 hover:text-blue-900" href="mailto:jbmcr.president@durham.ac.uk">jbmcr.president@durham.ac.uk</a>,
                    and follow the instagram for updates <a className="underline text-blue-700 hover:text-blue-900" href="https://www.instagram.com/josephinebutlermcr/">@josephinebutlermcr</a>!
                    Myself and the other exec committee members are here to support you and help you make the most
                    of your time at college, and wish you all the best throughout your time in Durham.<br/><br/>

                    I look forward to meeting you, and will hopefully see you in Durham!


                </div>


            </div>

            <Divider/>

            <LatestPosts types={["MCR News"]} text="Latest News"/>

        </div>
    }

}

export default MCRHomepage;