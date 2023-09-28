import React from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

const BackArrow = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-white p-[6px]  text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
      >
        <BiArrowBack />
      </button>
    </div>
  );
};

export default BackArrow;
