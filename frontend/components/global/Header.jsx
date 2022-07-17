import React from 'react';
import {menuItems} from "./menuItems";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="sticky top-0 md:container md:mx-auto z-40">
                <div className=" bg-red-700 flex items-center">
                    <div className="flex items-center p-4 flex-grow">
                        <button className="w-28 transition ease-out hover:scale-110 duration-300 flex-initial pr-4"><img src="../../media/global/JCRLogo.png"/></button>
                        <div className="flex-grow text-4xl text-white font-raleway">Butler<br/>JCR</div>
                    </div>
                        <div className="mt-4 self-end align-">
                            <ul className="menu sm-vertical sm:menu-horizontal self-end">
                                {menuItems.map((menu, index) => {
                                    return (
                                        <li className="menu-items" key={index}>
                                            { (menu.access === "all" || (menu.access === "admin" && this.props.admin !== false && this.props.admin !== "waiting")
                                                                     || (menu.access === "verified" && this.props.verified !== false && this.props.verified !== "waiting")) &&
                                                <Link to={menu.page} className="text-center self-end hover:animate-pingOnce p-2 bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300">{menu.title} </Link>
                                            }
                                            <ul>
                                            {menu.items.map((subMenu, index) => {
                                                console.log("BRNS")
                                                return (
                                                    <li className="menu-items" key={index}>
                                                        { (subMenu.access === "all" || (subMenu.access === "admin" && this.props.admin !== false && this.props.admin !== "waiting")
                                                            || (subMenu.access === "verified" && this.props.verified !== false && this.props.verified !== "waiting")) &&
                                                        <Link to={subMenu.page} className="text-center  p-2 hover:animate-pingOnce bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300">{subMenu.title} </Link>
                                                        }
                                                    </li>
                                                );
                                            })}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                </div>
            <div className="w-full h-4 align bg-red-800"></div>

            </div>

    }
}

export default Header;