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
                    <div className="w-full text-center mt-1 font-semibold text-grey-800">Joe Gellman</div>
                    <div className="w-full text-center text-grey-800 italic">MCR President</div>
                </div>
                <div className="text-sm text-grey-900 w-full sm:w-2/3">
                    Hello and welcome to Josephine Butler College! <br/><br/>
                    I’m Joe Gellman, the MCR President, and I’m delighted to introduce you to our college and our postgraduate community.

                    MCR stands for Middle Common Room, and it’s the name we give to the association of all postgraduate students at Butler.
                    As an MCR member, you’ll have access to a range of academic, social and welfare events and activities throughout the year,
                    as well as a dedicated MCR space in the college where you can relax, study and meet other postgrads.<br/><br/>


                    Butler is a unique college in many ways. We are the newest college in Durham, founded in 2006, and we are named after
                    Josephine Butler, a 19th-century feminist and social reformer who campaigned for women’s rights, education and health.
                    Our motto is “Comme je trouve”, which means “As I find” in French. It reflects our spirit of taking life as we find it and making the best of it.
                    We are also the only self-catered college in Durham, which means you have more freedom and flexibility to cook your own meals and manage your own budget.
                    Our college colours are red and gold, which are also the colours of Josephine Butler’s family coat of arms.<br/><br/>

                    Durham is a wonderful place to study as a postgraduate. It’s a historic city with a stunning cathedral and castle, as well as a vibrant cultural scene with museums,
                    theatres, festivals and more. The university offers excellent facilities and resources for research and teaching, as well as opportunities for personal and professional development.
                    And the surrounding countryside is beautiful and inspiring, with hills, rivers, forests and beaches to explore.We have a tradition of holding gowned formal dinners every term,
                    where we dress up in academic gowns and enjoy a three-course meal with wine and speeches. Our college bar is the largest of all the college bars in Durham.
                    It’s a great place to socialise, play games or watch sports on the big screen.<br/><br/>

                    I hope this gives you a taste of what to expect at Butler and Durham as a postgraduate student. If you have any questions or concerns,
                    please don’t hesitate to contact me or any of the MCR committee members. We are here to support you and make your experience as enjoyable and rewarding as possible. <br/><br/>

                    I look forward to meeting you soon!

                </div>


            </div>

            <Divider/>

            <LatestPosts types={["MCR News"]} text="Latest News"/>

        </div>
    }

}

export default MCRHomepage;