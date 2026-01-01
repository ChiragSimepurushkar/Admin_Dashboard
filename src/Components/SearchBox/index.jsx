// import React from "react";
// import { IoSearch } from "react-icons/io5";

// const SearchBox = () => {
//   return (
//     <div className="w-full h-auto bg-white overflow-hidden relative">
//       <IoSearch className="absolute top-1/2 left-[12px] -translate-y-1/2 z-50 text-[18px] opacity-50 pointer-events-none" />
//       <input
//         type="text"
//         className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] p-2 pl-8 focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-[13px] placeholder:text-gray-500"
//         placeholder="Search here..."
//       />
//     </div>
//   );
// };

// export default SearchBox;
import React, { useState, useEffect } from 'react';

import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useRef } from 'react';
const SearchBox = (props) => {

  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props.setSearchQuery(e.target.value);
    if (searchInput.current.value === "") {
      props.setPageOrder(1);
    }
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        ref={searchInput}
        onChange={onChangeInput}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default SearchBox;