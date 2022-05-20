import React from 'react';
import {menuItems} from "./menuItems";

class Header extends React.Component {

    render() {
        return <div className="sticky top-0 md:container md:mx-auto">
            <div className=" bg-red-400 p-8 flex items-center">
                <button className="transition ease-out hover:scale-110 duration-300 flex-initial pr-8"><img src="../../media/global/JCRLogo.png"/></button>
                <div>
                    <div className="flex-grow text-4xl text-white font-raleway">Josephine Butler College JCR</div>
                    <div className="mt-4">
                        <ul className="flex">
                            {menuItems.map((menu, index) => {
                                return (
                                    <li className="menu-items" key={index}>
                                        <a className="p-3 bg-red-500 transition ease-out hover:scale-110 duration-300" href="/#">{menu.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    }
}

export default Header;