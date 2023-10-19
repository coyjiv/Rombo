'use client'

import React, { useEffect, useRef, useState } from "react";
import EditProfile from "../../components/views/EditProfile";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGetUserDetails } from "@/helpers/useGetUserDetails";
import { useGetUserProfile } from "@/helpers/useGetUserProfile";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { PagesContainer } from "@/components/layout/containers";
import { CldUploadWidget } from 'next-cloudinary';
import { updateAvatar } from "@/app/slices/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackArrow } from "@/components/buttons";

const Profile = () => {
  const session = useSession();

  const prefixUser = session?.data?.user;

  const isLoading = useAppSelector(({ user: { isLoading } }) => isLoading)
  const dispatch = useAppDispatch();

  const userData = useGetUserDetails();
  const profile = useGetUserProfile();

  console.log("Displayed fullName:", userData?.fullName);
  console.log("Displayed fullName in profile:", profile?.fullName);
  console.log("Displayed firstName and lastName in profile:", profile?.firstName, profile?.lastName);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ selectedImage, setSelectedImage ] = useState(
    prefixUser?.image ?? "/img/avatar.webp"
  );
  const [ isRxCrossVisible, setIsRxCrossVisible ] = useState(false);
  const imageInputRef = useRef(null);

  const handleImageSelect = (e: any) => {
    const file = e?.target?.files[ 0 ];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };
  const notifySuccess = () => toast.success("Your profile was updated");
  const notifyError = () => toast.error("An error occurred while updating the profile");

  const copyUserNameToClipboard = () => {
    const usernameToCopy = userData?.fullName;
    if (usernameToCopy) {
      navigator.clipboard.writeText(usernameToCopy);
      toast("User name was copied to the clipboard");
    }
  };

  const copyEmailToClipboard = () => {
    const emailToCopy = userData?.email;
    if (emailToCopy) {
      navigator.clipboard.writeText(emailToCopy);
      toast("Email was copied to the clipboard");
    }
  };

  const copyPhoneToClipboard = () => {
    const phoneToCopy = userData?.phone;
    if (phoneToCopy) {
      navigator.clipboard.writeText(phoneToCopy);
      toast("Phone number was copied to the clipboard");
    }
  };

  const copyNicknameToClipboard = () => {
    const nicknameToCopy = userData?.nickname;
    if (nicknameToCopy) {
      navigator.clipboard.writeText(nicknameToCopy);
      toast("Nickname was copied to the clipboard");
    }
  };

  // const handleImageClick = () => {
  //   openGallery([
  //     {
  //       original: selectedImage,
  //       thumbnail: selectedImage,
  //     },
  //   ]);
  // };

  if (isLoading) {
    return <div className="flex justify-center items-center mt-52">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    
  }

  return (
    <PagesContainer>
      {!isEditing ? (
        <div className="flex justify-between p-4">
          <BackArrow />
          <button
            className="text-white p-[10px] text-xl rounded-full transition ease-in-out bg-dark-purple  hover:bg-super-purple  hover:-translate-y-1 hover:scale-110duration-300"
            onClick={handleEditProfileClick}
          >
            <AiOutlineEdit />
          </button>
        </div>
      ) : null}

      {isEditing ? (
        <EditProfile
          setIsEditing={setIsEditing}
          profileData={profile}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      ) : (
        <div>
          <div className="flex flex-col-reverse md:flex-row justify-between my-4">
            <div
              className="mb-4 p-4 duration-300 border-dark-purple "
              // onClick={handleImageClick}
            >
              <div onClick={copyUserNameToClipboard} className="cursor-pointer text-gray-300 font-bold text-2xl mb-1">
                {profile?.fullName ?? userData?.fullName ?? "Erororoororoor"}
              </div>
              <div className="text-gray-300">{userData?.bio}</div>
            </div>
            <CldUploadWidget uploadPreset="hheznuwk" onUpload={(res) => {
              // @ts-ignore 
              if (res.event === 'success' && res?.info?.url)
                // @ts-ignore 
                dispatch(updateAvatar(res.info?.url))
              fetch('/api/profile/changeAvatar', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                // @ts-ignore 
                body: JSON.stringify({ avatar: res.info?.url })
              })

            }}>
              {({ open }) => {
                function handleOnClick(e: any) {
                  e.preventDefault();
                  open();
                }
                return (
                  <div className="relative w-32 h-32 mx-auto md:mr-5 md:ml-auto cursor-pointer" onClick={handleOnClick}>
                    <Image
                      className="rounded-xl shadow-slate-800 shadow-md h-auto"
                      alt="Avatar"
                      src={userData?.avatar ?? "/img/avatar.webp"}
                      fill
                    />

                    {/* <input
                      type="file"
                      accept="image/*"
                      onChange={handleOnClick}
                      style={{ display: "none" }}
                      ref={imageInputRef}
                    /> */}
                    <button onClick={handleOnClick}>
                      <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
                    </button>
                  </div>
                );
              }}
            </CldUploadWidget>

          </div>
          <ul className="grid gap-4 p-4 text-white">
            <div
              onClick={copyEmailToClipboard}
              className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4"
            >
              <li className="font-bold">Email</li>
              {userData?.email}
            </div>

            <div onClick={copyPhoneToClipboard} className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
              <li className="font-bold">Phone number</li>
              <div>{profile?.phone}</div>
            </div>

            <div onClick={copyNicknameToClipboard} className="hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4 ">
              <li className="font-bold">Nickname</li>
              <div>{profile?.nickname}</div>
            </div>

            <div className="cursor-pointer hover:bg-opacity-60 duration-300 rounded-lg p-4">
              <li className="font-bold flex justify-center">
                <button
                  onClick={handleEditProfileClick}
                  className="btn btn-primary border-dark-purple bg-gradient-to-r transition-all w-1/3 from-super-purple via-purple-700 to-super-dark-purple rounded-lg shadow-md hover:from-super-purple hover:via-purple-700 hover:to-super-dark-purple ease-in-out hover:duration-700 bg-pos-0 hover:bg-pos-50 bg-size-200 text-white"
                >
                  Edit profile
                </button>
              </li>
            </div>
          </ul>
          <ToastContainer />
        </div>
      )}
    </PagesContainer>
  );
};

export default Profile;
