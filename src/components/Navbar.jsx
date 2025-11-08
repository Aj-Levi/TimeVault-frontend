import React from "react";
import { Link } from "react-router-dom";
import NavbarIcons from "./NavbarIcons";
import SidebarMenuBtn from "./SidebarMenuBtn";

const Header = () => {
    return (
        <header className="z-30 sticky top-0 flex flex-col border-b-2 bg-base-100">
            <div className="flex lg:w-[86%] lg:mx-auto py-4 lg:justify-between lg:items-center px-4 w-full justify-between items-center">
                <SidebarMenuBtn />
                <div className="flex items-center gap-x-8">
                    <div className="flex items-center cursor-pointer gap-x-4">
                        <div className="relative w-8 h-8 rounded-full">
                            <img src="/HomeFavicon.png" alt="favicon" className="object-contain rounded-full" />
                        </div>
                        <Link to="/home">
                            <div className="font-extrabold text-[1.5em] text-secondary">
                                TimeVault
                            </div>
                        </Link>
                    </div>
                    <ul className="max-lg:hidden flex gap-x-[1.25rem] font-bold text-[1.1rem] *:flex *:items-center *:cursor-pointer">
                        <li>
                            <Link to="#featured">Explore</Link>
                        </li>
                        <li>
                            <Link to="#featured">Globe</Link>
                        </li>
                        <li>
                            <Link to="#new-arrivals">Contribute</Link>
                        </li>
                    </ul>
                </div>
                <NavbarIcons />
            </div>
        </header>
    );
};

export default Header;
