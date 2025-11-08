import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchIcon = () => {
  return (
    <button
      className="font-semibold btn btn-secondary max-md:p-2"
      aria-label="Search"
    >
      <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
};

export default SearchIcon;