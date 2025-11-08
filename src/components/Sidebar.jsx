import React from "react";
import { useZustandStore } from "../ZustandStore.js";
import { MdOutlineExplore } from "react-icons/md";
import { FaGlobeAmericas, FaTrophy } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useZustandStore();

  const closeSidebar = (e) => {
    e.stopPropagation();
    toggleSidebar();
  };

  const handleNavigation = (path) => {
    // Replace with your routing logic (React Router, etc.)
    window.location.href = path;
  };

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-black ${
          isSidebarOpen ? "opacity-50" : "hidden"
        } lg:hidden`}
        onClick={(e) => {
          e.stopPropagation();
          closeSidebar(e);
        }}
      ></div>
      <div
        className={`w-[45vw] lg:w-[30vw] flex flex-col max-sm:w-screen fixed left-0 top-0 bottom-0 z-20 bg-base-100 transition-transform duration-700 rounded-r-xl ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-center items-center mt-18 p-4 border-b border-base-300 bg-base-200">
          <h2 className="text-xl font-semibold text-primary">TimeVault</h2>
        </div>

        <div className="flex flex-col flex-1 justify-between">
          <div>
            <nav className="p-4 border-b border-base-300">
              <ul className="menu menu-vertical gap-1 text-base-content">
                <li onClick={(e) => closeSidebar(e)}>
                  <button
                    onClick={() => handleNavigation("/home")}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <MdOutlineExplore size={18} />
                    <span>Explore</span>
                  </button>
                </li>
                <li onClick={(e) => closeSidebar(e)}>
                  <button
                    onClick={() => handleNavigation("/categories")}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <FaGlobeAmericas size={18} />
                    <span>Globe</span>
                  </button>
                </li>
                <li onClick={(e) => closeSidebar(e)}>
                  <button
                    onClick={() => handleNavigation("/contribute")}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <LuNewspaper size={18} />
                    <span>Contribute</span>
                  </button>
                </li>
                <li onClick={(e) => closeSidebar(e)}>
                  <button
                    onClick={() => handleNavigation("/leaderboard")}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <FaTrophy size={18} />
                    <span>Top Contributors</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div className="p-4 mt-auto bg-base-300 text-center text-sm text-base-content">
              <p>© 2025 TimeVault. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
