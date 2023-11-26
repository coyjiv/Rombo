import React from "react";

const SkeletonItem = () => {
  return (
    <li className="opacity-70 cursor-pointer flex rounded-lg shadow-xl p-4 animate-pulse">
      <div className="flex-none mr-5 h-16 w-16 bg-gradient-to-br  brightness-[0.9] from-super-purple to-purple-500  rounded-full"></div>
      <div className="flex flex-grow justify-between">
        <div className="flex flex-col justify-around">
          <div className="w-32 rounded-lg h-6  bg-gradient-to-br brightness-[0.9] from-gray-50 to-gray-300  mb-2"></div>
          <div className="w-48 rounded-lg h-3  bg-gradient-to-br brightness-[0.9] from-gray-50 to-gray-300  mb-2"></div>
          <div className="w-48 rounded-lg h-3  bg-gradient-to-br brightness-[0.9] from-gray-50 to-gray-300 "></div>
        </div>
        <div className="flex items-center">
         
        </div>
      </div>
    </li>
  );
};

export default SkeletonItem;