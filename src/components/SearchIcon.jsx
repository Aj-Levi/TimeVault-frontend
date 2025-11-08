import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchIcon = () => {
  return (
    <Link to={"/search"}>
      <button
        className="font-semibold btn btn-secondary max-md:p-2"
        aria-label="Search"
      >
        <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </Link>
  );
};

export default SearchIcon;
