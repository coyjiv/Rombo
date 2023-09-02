import React, { useEffect, useState } from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { RxAvatar } from "react-icons/rx";

const generateFakeProfileData = () => {
  const profile = {
    id: 1,
    name: faker.person.fullName(),
    bio: faker.person.bio(),
  };
  return profile;
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const generatedData = generateFakeProfileData();
      setProfileData(generatedData);
    } catch (err) {
      setError(err);
    }
  }, []);

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  if (!profileData) {
    return null;
  }

  const { name, bio } = profileData;

  return (
    <div className="w-full">
      <div className="flex justify-around bg-black">
      <div
        className="mb-4 p-4 rounded-lg  duration-300 border border-dark-purple"
      >
        <div className=" text-gray-300 font-bold text-2xl mb-1">{name}</div>
        <div className="text-gray-300">{bio}</div>
      </div>
      <button>
      <Image
        className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-full"
        alt="Logo"
        src="/img/logo.png"
        width={100}
        height={100}
      />
      </button>
      <button className=""><RxAvatar className="text-white fill-red-600 text-5xl relative right-10 top-10 hover:shadow-custom rounded-full duration-500"/></button>
      </div>
      <ul className="bg-black">
    <li>Email</li>
    <li>Phone number</li>
    <li>Nickname</li>
    <li></li>
    </ul>
    </div>
  );
};

export default Profile;