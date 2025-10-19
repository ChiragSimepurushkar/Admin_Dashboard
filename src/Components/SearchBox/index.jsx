import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <div className="w-full h-auto bg-white overflow-hidden relative">
      <IoSearch className="absolute top-1/2 left-[12px] -translate-y-1/2 z-50 text-[18px] opacity-50 pointer-events-none" />
      <input
        type="text"
        className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] p-2 pl-8 focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-[13px] placeholder:text-gray-500"
        placeholder="Search here..."
      />
    </div>
  );
};

export default SearchBox;