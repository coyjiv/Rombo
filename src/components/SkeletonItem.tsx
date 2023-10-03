import React from "react";

const SkeletonItem = () => {
  return (
    <li className="opacity-70 cursor-pointer flex rounded-lg shadow-xl p-4 bg-gradient-to-br from-medium-light-purple to-bold-medium-purple animate-pulse">
      <div className="mr-4 w-20 h-20 bg-gradient-to-br brightness-[0.9] from-super-purple to-purple-500  rounded-full"></div>
      <div className="flex flex-grow justify-between">
        <div className="flex flex-col justify-around">
          <div className="w-32 rounded-lg h-6  bg-gradient-to-br brightness-[0.9] from-super-purple to-purple-500  mb-2"></div>
          <div className="w-48 rounded-lg h-3  bg-gradient-to-br brightness-[0.9] from-super-purple to-purple-500  mb-2"></div>
          <div className="w-48 rounded-lg h-3  bg-gradient-to-br brightness-[0.9] from-super-purple to-purple-500 "></div>
        </div>
        <div className="flex items-center">
         
        </div>
      </div>
    </li>
  );
};

export default SkeletonItem;