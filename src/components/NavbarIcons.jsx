import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchIcon from "./SearchIcon";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-x-2 *:cursor-pointer">
      <SearchIcon />
      <ThemeToggle />
    </div>
  );
};

export default NavbarIcons;
