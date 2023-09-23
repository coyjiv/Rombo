import React, { useRef, useState } from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import Gallery from "@/components/gallery/Gallery";
import { BiArrowBack } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { useGetUserDetails } from "@/helpers/useGetUserDetails";
import { IUser } from "@/mongo/models/User";
import { UserProfile } from "@/types";
import { useAppDispatch } from "@/app/hooks";
import { updateProfile } from "@/app/slices/userSlice";

const EditProfile = ({
  setIsEditing,
  profileData,
}: //   openGallery,
any) => {
  // const [editedProfileData, setEditedProfileData] = useState({
  //   ...profileData,
  // });
  const session = useSession();
  const dispatch = useAppDispatch();
  console.log(session);
  const prefixUser = useGetUserDetails();
  const fullName = prefixUser?.fullName; 
  const firstName = fullName?.split(' ')[0];
  const lastName = fullName?.split(' ')[1];

  const [selectedImage, setSelectedImage] = useState(
    prefixUser?.avatar ?? "/img/avatar.webp"
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleCancelEdit = () => {
    setIsEditing(false);
    // setEditedProfileData({ ...profileData });
  };

const profileValues = {
  firstName:  "",
  lastName:  "",
  bio:  "",
  phone:  "",
  nickname:  "",    
}

  // const handleImageSelect = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  // const handleImageClick = () => {
  //   setIsGalleryOpen(true);
  // };
  // const galleryImages = [
  //   {
  //     original: selectedImage,
  //     thumbnail: selectedImage,
  //   },
  // ];

  const saveProfile = async (values:UserProfile) => {
    try {
      const updatedProfileData = {
        ...profileData, 
        fullName: `${values.firstName} ${values.lastName}`,
        bio: values.bio,
        phone: values.phone,
        nickname: values.nickname,
      };

      const response = await fetch('/api/profile/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old: profileData,
          newUser: updatedProfileData,
        }),
      });

      if (response.status === 201) {
        console.log("Profile updated successfully");
        setIsEditing(false);
        dispatch(updateProfile(updatedProfileData))
      } else {
      }
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full rounded-lg bg-medium-purple shadow-2xl p-4 text-white">
      <button
        onClick={handleCancelEdit}
        className="text-white p-[6px]  text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
      >
        <BiArrowBack />
      </button>
      <div className="flex my-10">
        {selectedImage && (
          <Image
            // onClick={handleImageClick}
            className="rounded-xl w-1/4 shadow-slate-800 shadow-md cursor-pointer ml-4"
            alt="Avatar"
            src={prefixUser?.avatar ?? "/img/avatar.webp"}
            width={200}
            height={200}
          />
        )}
        <input
          type="file"
          accept="image/*"
          // onChange={handleImageSelect}
          className="hidden"
          ref={imageInputRef}
        />
        <button>
          <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
        </button>
      </div>
      <Formik
        initialValues={profileValues}
       onSubmit={(values)=>{saveProfile(values)}}
      >
        <Form className="rounded-lg m-3">
          {/* First name */}
          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple rounded-t-lg duration-300  p-4">
            <li className="list-none font-bold">First name</li>
            <Field
              placeholder={firstName}
              type="text"
              id="firstName"
              name="firstName"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div>
          {/* <ErrorMessage name="name" component="div" /> */}

          {/* Last name (optional) */}
          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
            <li className="list-none font-bold">Last name (optional)</li>
            <Field
              placeholder={lastName}
              type="text"
              id="lastName"
              name="lastName"
              className="py-2 bg-gray-600 w-full rounded-lg "
            />
          </div>
          {/* <ErrorMessage name="bio" component="div" /> */}

          {/* Bio */}
          <div className=" cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
            <li className="list-none font-bold">Bio</li>
            <Field
              placeholder={prefixUser?.bio}
              type="text"
              id="bio"
              name="bio"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div>

           {/* Email */}
           <div className="hidden cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
            <li className="list-none font-bold">Email</li>
            <Field
              placeholder={prefixUser?.email}
              type="text"
              id="email"
              name="email"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div>

           {/* Phone number */}
           <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
            <li className="list-none font-bold">Phone number</li>
            <Field
              placeholder={prefixUser?.phone}
              type="text"
              id="phone"
              name="phone"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div>

           {/* Nickname */}
           <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4 rounded-b-lg">
            <li className="list-none font-bold">Nickname</li>
            <Field
              placeholder={prefixUser?.nickname}
              type="text"
              id="nickname"
              name="nickname"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div>
          
          <div className="flex justify-between p-4">
        <button className="btn btn-primary" type="submit">
          Save Profile
        </button>
        <button className="btn btn-danger" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
        </Form>
      </Formik>
      
      {isGalleryOpen && (
        <Gallery
          // images={galleryImages}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default EditProfile;




