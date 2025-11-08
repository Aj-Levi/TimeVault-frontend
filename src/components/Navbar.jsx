import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarIcons from "./NavbarIcons";
import SidebarMenuBtn from "./SidebarMenuBtn";

const scrollToFeatured = () => {
  const element = document.getElementById("featured");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = () => {
  const navigate = useNavigate();

  // ✅ Access user from Redux store
  const { user } = useSelector((state) => state.auth);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="z-30 sticky top-0 flex flex-col border-b-2 bg-base-100">
      <div className="flex lg:w-[86%] lg:mx-auto py-4 lg:justify-between lg:items-center px-4 w-full justify-between items-center">
        <SidebarMenuBtn />
        <div className="flex items-center gap-x-8">
          <div className="flex items-center cursor-pointer gap-x-4">
            <div className="relative w-8 h-8 rounded-full">
              <img
                src="/Logo.jpg"
                alt="favicon"
                className="object-contain rounded-full"
              />
            </div>
            <Link to="/">
              <div className="font-extrabold text-[1.5em] text-secondary">
                TimeVault
              </div>
            </Link>
          </div>

          <ul className="max-lg:hidden flex gap-x-[1.25rem] font-bold text-[1.1rem] *:flex *:items-center *:cursor-pointer">
            <li onClick={scrollToFeatured}>Explore</li>
            <li>
              <Link to="/globe">Globe</Link>
            </li>
            <li>
              <Link to="/contribute">Contribute</Link>
            </li>
            <li>
              <Link to="/leaderboard">Top Contributors</Link>
            </li>
          </ul>
        </div>

        {/* ✅ Right-side buttons (Profile or Login/Signup) */}
        <div className="flex items-center gap-4">
          <NavbarIcons />
          {user ? (
            <button
              onClick={handleProfileClick}
              className="btn btn-secondary btn-sm px-4 font-semibold"
            >
              {user.name ? `Hi, ${user.name.split(' ')[0]}` : "Profile"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary btn-sm px-4 font-semibold"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
