import React from 'react';
const Badge = (props) => {
    return (
        <span
            className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize ${props.status === "pending" && "bg-[#ff5252] text-white"
                } ${props.status === "confirm" && "bg-green-500 text-white"} ${props.status ===
                "delivered" && "bg-green-700 text-white"} `}
        >
            {props.status}
        </span>
    );
}

// Mock Badge component

// import { useState, useEffect } from 'react';
// import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// Mock Badge component - replace with your actual import
// const Badge = ({ status }) => {
//   const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800',
//     confirm: 'bg-blue-100 text-blue-800',
//     confirmed: 'bg-blue-100 text-blue-800',
//     processing: 'bg-purple-100 text-purple-800',
//     shipped: 'bg-indigo-100 text-indigo-800',
//     delivered: 'bg-green-100 text-green-800',
//     cancelled: 'bg-red-100 text-red-800',
//     COMPLETED: 'bg-green-100 text-green-800'
//   };

//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
//       {status?.toUpperCase()}
//     </span>
//   );
// };

export default Badge;