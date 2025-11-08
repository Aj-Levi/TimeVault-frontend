import React from "react";
import { Link } from "react-router-dom";
import NavbarIcons from "./NavbarIcons";
import SidebarMenuBtn from "./SidebarMenuBtn";

const scrollToFeatured = () => {
  const element = document.getElementById("featured");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = () => {
    return (
        <header className="z-30 sticky top-0 flex flex-col border-b-2 bg-base-100">
            <div className="flex lg:w-[86%] lg:mx-auto py-4 lg:justify-between lg:items-center px-4 w-full justify-between items-center">
                <SidebarMenuBtn />
                <div className="flex items-center gap-x-8">
                    <div className="flex items-center cursor-pointer gap-x-4">
                        <div className="relative w-8 h-8 rounded-full">
                            <img src="/Logo.jpg" alt="favicon" className="object-contain rounded-full" />
                        </div>
                        <Link to="/">
                            <div className="font-extrabold text-[1.5em] text-secondary">
                                TimeVault
                            </div>
                        </Link>
                    </div>
                    <ul className="max-lg:hidden flex gap-x-[1.25rem] font-bold text-[1.1rem] *:flex *:items-center *:cursor-pointer">
                        <li onClick={scrollToFeatured}>
                            Explore
                        </li>
                        <li>
                            <Link to="/globe">Globe</Link>
                        </li>
                        <li>
                            <Link to="/contribute">Contribute</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">Top Contributers</Link>
                        </li>
                    </ul>
                </div>
                <NavbarIcons />
            </div>
        </header>
    );
};

export default Header;
