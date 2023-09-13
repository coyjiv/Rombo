import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxAvatar} from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Profile = () => {
  const session = useSession();
  
  console.log(session);
  const prefixUser = session?.data?.user;
  
  const [profileData, setProfileData] = useState<null | any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(prefixUser?.image??"/img/avatar.webp");
  const [isRxCrossVisible, setIsRxCrossVisible] = useState(false);
  const imageInputRef = useRef(null);



  const handleImageSelect = (e:any) => {
    const file = e?.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };


  const handleEditProfileClick = () => {
    setIsEditing(!isEditing);
  };

  // const handleImageClick = () => {
  //   openGallery([
  //     {
  //       original: selectedImage,
  //       thumbnail: selectedImage,
  //     },
  //   ]);
  // };

  const router = useRouter();
  
  return (
    <div className="w-full p-4 mt-12 rounded-lg bg-medium-purple shadow-2xl">
      <div className="flex justify-between p-4">
        <button
          onClick={() => router.back()}
          className="text-white p-[6px]  text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
        >
          <BiArrowBack />
        </button>
        <button
          className="text-white p-[10px] text-xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
          onClick={handleEditProfileClick}
        >
          <FaEdit />
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <div
          className="mb-4 p-4 duration-300 border-dark-purple cursor-pointer"
        >
          <div className=" text-gray-300 font-bold text-2xl mb-1">{prefixUser?.name}</div>
          {/* <div className="text-gray-300">{bio}</div> */}
        </div>
        <div className="flex">
          {selectedImage && (
            <Image
              className="rounded-xl shadow-slate-800 shadow-md cursor-pointer"
              alt="Avatar"
              src={prefixUser?.image??"/img/avatar.webp"}
              width={200}
              height={200}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            ref={imageInputRef}
          />
          <button>
            <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
          </button>
        </div>
      </div>
      <ul className=" grid gap-4 p-4 text-white">
        <div className="cursor-pointer hover:bg-opacity-60  bg-dark-purple duration-300 rounded-lg p-4 ">
          <li className="font-bold">Email</li>
          {prefixUser?.email}
        </div>

        <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
          <li className="font-bold">Phone number</li>
          {/* <div>{phone}</div> */}
        </div>

        <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
          <li className="font-bold">Nickname</li>
          {/* <div>{nickname}</div> */}
        </div>

        <div className="hover:bg-opacity-60 duration-300 rounded-lg p-4 ">
          <li className="font-bold flex justify-center">
            <button className="btn btn-primary w-1/3">Edit profile</button>
          </li>
        </div>
      </ul>

      
    </div>
  );
};

export default Profile;
