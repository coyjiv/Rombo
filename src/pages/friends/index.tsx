import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { PagesContainer } from "@/components/layout/containers";
import { BackArrow } from "@/components/buttons";

type Props = {};

const Friends = () => {
  const generateFakeFriendsData = () => {
    const friends = Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      avatar: faker.internet.avatar(),
      status: faker.lorem.sentence(),
    }));
    return friends;
  };

  const friendsData = generateFakeFriendsData();

  return (
    <PagesContainer>
      <div className="flex justify-between p-4">
        <BackArrow />
      </div>

      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Friends</h1>
        <ul>
          {friendsData.map((friend, index) => (
            <li key={index} className="flex items-center mb-4">
              <Image
                src={friend.avatar}
                width={1024}
                height={768}
                alt={`Avatar of ${friend.name}`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{friend.name}</h2>
                <p className="text-gray-400">{friend.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PagesContainer>
  );
};

export default Friends;
