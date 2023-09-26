import React, { useEffect, useRef, useState } from "react";
import EditProfile from "../../components/views/EditProfile";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGetUserDetails } from "@/helpers/useGetUserDetails";
import { useGetUserProfile } from "@/helpers/useGetUserProfile";
import { useAppSelector } from "@/app/hooks";
import { PagesContainer } from "@/components/layout/containers";

const Profile = ({}) => {
  const session = useSession();

  const prefixUser = session?.data?.user;

  const isLoading = useAppSelector(({user:{isLoading}}) => isLoading)
  
  const userData = useGetUserDetails();
  const profile = useGetUserProfile();

  console.log("Displayed fullName:", userData?.fullName);
  console.log("Displayed fullName in profile:", profile?.fullName );
  console.log("Displayed firstName and lastName in profile:", profile?.firstName, profile?.lastName);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    prefixUser?.image ?? "/img/avatar.webp"
  );
  const [isRxCrossVisible, setIsRxCrossVisible] = useState(false);
  const imageInputRef = useRef(null);

  const handleImageSelect = (e: any) => {
    const file = e?.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
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

  if(isLoading){
    // return tailwind spinner

    return <div className="flex justify-center items-center mt-52">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  }

  return (
    <PagesContainer>
      {!isEditing ? (
        <div className="flex justify-between p-4">
          <button
            onClick={() => router.back()}
            className="text-white p-[6px]  text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
          >
            <BiArrowBack />
          </button>
          <button
            className="text-white p-[10px] text-xl rounded-full transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300"
            onClick={handleEditProfileClick}
          >
            <FaEdit />
          </button>
        </div>
      ) : null}

      {isEditing ? (
        <EditProfile
          setIsEditing={setIsEditing}
          profileData={profile}
        />
      ) : (
        <div>
          <div className="flex flex-col-reverse md:flex-row justify-between mb-4">
            <div
              className="mb-4 p-4 duration-300 border-dark-purple cursor-pointer"
              // onClick={handleImageClick}
            >
              <div className="text-gray-300 font-bold text-2xl mb-1">
                {profile?.fullName ?? userData?.fullName ?? "Erororoororoor"} 
              </div>
              <div className="text-gray-300">{userData?.bio}</div>
            </div>
            <div className="relative w-32 h-32 mx-auto md:mr-5 md:ml-auto cursor-pointer">
              <Image
                className="rounded-xl shadow-slate-800 shadow-md h-auto"
                alt="Avatar"
                src={userData?.avatar ?? "/img/avatar.webp"}
                fill
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
                ref={imageInputRef}
              />
              <button>
                <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
              </button>
            </div>
          </div>
          <ul className="grid gap-4 p-4 text-white">
            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
              <li className="font-bold">Email</li>
              {userData?.email}
            </div>

            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
              <li className="font-bold">Phone number</li>
              <div>{profile?.phone}</div>
            </div>

            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
              <li className="font-bold">Nickname</li>
              <div>{profile?.nickname}</div>
            </div>

            <div className="hover:bg-opacity-60 duration-300 rounded-lg p-4">
              <li className="font-bold flex justify-center">
                <button
                  onClick={handleEditProfileClick}
                  className="btn btn-primary w-1/3"
                >
                  Edit profile
                </button>
              </li>
            </div>
          </ul>
        </div>
      )}
    </PagesContainer>
  );
};

export default Profile;
