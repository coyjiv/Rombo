import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

type Props = {};

const Friends = ({ handleBackToChatList }) => {
  return (
    <div className="w-full p-4 mt-12 rounded-lg bg-medium-purple shadow-2xl">
      <div className="flex justify-between p-4">
        <button
          onClick={handleBackToChatList}
          className="text-white p-[6px] w-15 h-15 text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
        >
          <BiArrowBack />
        </button>
        <button className="text-white p-[6px] w-15 h-15 text-2xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 ">
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default Friends;
