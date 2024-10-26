import React from "react";
import { menuItems } from "./menuItems";
import { Link } from "react-router-dom";
import { MdOutlineClear, MdOutlineMenu } from "react-icons/md";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, subOpen: new Array(menuItems.length).fill(false) };
    }
    render() {
        return (
            <div className="sticky top-0 md:container md:mx-auto z-40">
                <div
                    className={
                        "flex md:block" + (this.props.mcr ? " bg-yellow-300" : " bg-red-700")
                    }
                >
                    <div className="flex items-center py-1 md:pb-0 md:pt-4 px-4 flex-grow">
                        <Link
                            onClick={() => this.setState({ open: false })}
                            to="/"
                            className="w-16 transition ease-out hover:scale-110 duration-300 flex-initial pr-4"
                        >
                            <img alt="Butler JCR Logo" src="../../media/global/JCRLogo.webp" />
                        </Link>
                        <div
                            className={
                                "flex-grow text-3xl font-raleway font-medium" +
                                (this.props.mcr ? " text-red-900" : " text-white")
                            }
                        >
                            Butler {this.props.mcr ? "MCR" : "JCR"}
                        </div>
                    </div>
                    <div className="self-end justify-end hidden md:flex">
                        <ul className="menu sm-vertical sm:menu-horizontal self-end">
                            {menuItems.map((menu, index) => {
                                return (
                                    <li className="menu-items" key={index}>
                                        {(menu.access === "all" ||
                                            (menu.access === "admin" &&
                                                this.props.admin !== false &&
                                                this.props.admin !== "waiting") ||
                                            (menu.access === "verified" &&
                                                this.props.verified !== false &&
                                                this.props.verified !== "waiting") ||
                                            (menu.access === "freshers" &&
                                                this.props.freshers === true)) && (
                                            <Link
                                                to={menu.items.length > 0 ? "#" : menu.page}
                                                className="text-center self-end hover:animate-pingOnce px-3 py-1 bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300"
                                            >
                                                {menu.title}{" "}
                                            </Link>
                                        )}
                                        <ul className="w-full">
                                            {menu.items.map((subMenu, index) => {
                                                return (
                                                    <li className="menu-items w-full" key={index}>
                                                        {(subMenu.access === "all" ||
                                                            (subMenu.access === "admin" &&
                                                                this.props.admin !== false &&
                                                                this.props.admin !== "waiting") ||
                                                            (subMenu.access === "verified" &&
                                                                this.props.verified !== false &&
                                                                this.props.verified !==
                                                                    "waiting") ||
                                                            (subMenu.access === "freshers" &&
                                                                this.props.freshers === true)) && (
                                                            <Link
                                                                to={subMenu.page}
                                                                className="w-full px-3 py-1 hover:animate-pingOnce bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: subMenu.title,
                                                                }}
                                                            ></Link>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="pr-9 flex md:hidden">
                        <button
                            aria-label="Open/Close Menu"
                            className={
                                "aspect-square swap swap-rotate " +
                                (this.state.open
                                    ? "swap-active bg-orange-700 hover:bg-orange-800"
                                    : "hover:bg-red-800 ")
                            }
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            <MdOutlineClear className="swap-on text-white text-3xl"></MdOutlineClear>
                            <MdOutlineMenu className="swap-off text-white text-3xl"></MdOutlineMenu>
                        </button>
                    </div>
                </div>
                <div className="flex md:hidden w-full">
                    {this.state.open && (
                        <div className="w-full">
                            <ul className="menu sm-vertical self-end w-full">
                                {menuItems.map((menu, index) => {
                                    return (
                                        <>
                                            {(menu.access === "all" ||
                                                (menu.access === "admin" &&
                                                    this.props.admin !== false &&
                                                    this.props.admin !== "waiting") ||
                                                (menu.access === "verified" &&
                                                    this.props.verified !== false &&
                                                    this.props.verified !== "waiting") ||
                                                (menu.access === "freshers" &&
                                                    this.props.freshers === true)) && (
                                                <li className="menu-items w-full flex" key={index}>
                                                    {menu.items.length > 0 ? (
                                                        <button
                                                            onClick={() =>
                                                                this.setState({
                                                                    subOpen: this.state.subOpen.map(
                                                                        (item, index2) => {
                                                                            return index === index2
                                                                                ? !item
                                                                                : false;
                                                                        },
                                                                    ),
                                                                })
                                                            }
                                                            className="w-full text-center self-end hover:animate-pingOnce px-3 py-1 bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300"
                                                        >
                                                            <p className="text-center w-full">
                                                                {menu.title}
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            onClick={() =>
                                                                this.setState({ open: false })
                                                            }
                                                            to={menu.page}
                                                            className="w-full text-center self-end hover:animate-pingOnce px-3 py-1 bg-red-900 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300"
                                                        >
                                                            <p className="text-center w-full">
                                                                {menu.title}
                                                            </p>
                                                        </Link>
                                                    )}
                                                </li>
                                            )}

                                            {this.state.subOpen[index] &&
                                                menu.items.map((subMenu, index) => {
                                                    return (
                                                        <li
                                                            className="menu-items w-full sm-vertical"
                                                            key={index}
                                                        >
                                                            {(subMenu.access === "all" ||
                                                                (subMenu.access === "admin" &&
                                                                    this.props.admin !== false &&
                                                                    this.props.admin !==
                                                                        "waiting") ||
                                                                (subMenu.access === "verified" &&
                                                                    this.props.verified !== false &&
                                                                    this.props.verified !==
                                                                        "waiting") ||
                                                                (subMenu.access === "freshers" &&
                                                                    this.props.freshers ===
                                                                        true)) && (
                                                                <Link
                                                                    onClick={() =>
                                                                        this.setState({
                                                                            open: false,
                                                                        })
                                                                    }
                                                                    to={subMenu.page}
                                                                    className="w-full text-center  px-3 py-1 hover:animate-pingOnce bg-orange-800 text-white transition ease-out hover:z-50 hover:bg-orange-400 duration-300"
                                                                >
                                                                    <p className="text-center w-full">
                                                                        {subMenu.title.replace(
                                                                            "<br/>",
                                                                            " ",
                                                                        )}
                                                                    </p>
                                                                </Link>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                        </>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="w-full h-4 align bg-red-800" />
            </div>
        );
    }
}

export default Header;
