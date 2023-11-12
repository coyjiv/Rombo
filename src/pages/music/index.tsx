import React from "react";
import Image from "next/image";
import { PagesContainer } from "@/components/layout/containers";
import { BackArrow } from "@/components/buttons";

type Props = {};

const Music = () => {
  return (
    <PagesContainer>
      <div className="flex justify-between p-4">
        <BackArrow />
      </div>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Music</h1>
        <div className="mb-8"></div>

        <h2 className="text-xl font-bold mb-2">Songs</h2>
        <ul>
          <li className="mb-2">
            <span className="text-gray-400"></span>{" "}
          </li>
        </ul>
      </div>
    </PagesContainer>
  );
};

export default Music;
