import React, { useRef, useState } from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import Gallery from "@/components/gallery/Gallery";
import { BiArrowBack } from "react-icons/bi";
import { useSession } from "next-auth/react";

const EditProfile = ({
  setIsEditing,
  profileData,
}: //   openGallery,
any) => {
  const [editedProfileData, setEditedProfileData] = useState({
    ...profileData,
  });
  const session = useSession();
  console.log(session);
  const prefixUser = session?.data?.user;

  const [selectedImage, setSelectedImage] = useState(
    prefixUser?.image ?? "/img/avatar.webp"
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfileData({ ...profileData });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedProfileData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const saveProfile = async () => {
    try {
      const response = await fetch('/api/profile/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old: profileData,
          newUser: editedProfileData,
        }),
      });

      if (response.status === 201) {
        console.log("Profile updated successfully");
        setIsEditing(false);
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
            src={prefixUser?.image ?? "/img/avatar.webp"}
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
      <div>
        <ul className="grid gap-4 p-4 text-white">
          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">First name</li>
            <input
              className="py-2 bg-gray-600 w-full "
              type="text"
              id="name"
              name="name"
              value={editedProfileData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">Last name (optional)</li>
            <input
              className="py-2 bg-gray-600 w-full "
              type="text"
              id="bio"
              name="bio"
              value={editedProfileData.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">Email</li>
            <input
              className="py-2 bg-gray-600 w-full "
              type="text"
              id="email"
              name="email"
              value={editedProfileData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">Phone number</li>

            <input
              className="py-2 bg-gray-600 w-full "
              type="text"
              id="phone"
              name="phone"
              value={editedProfileData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">Nickname</li>
            <input
              className="py-2 bg-gray-600 w-full "
              type="text"
              id="nickname"
              name="nickname"
              value={editedProfileData.nickname}
              onChange={handleInputChange}
            />
          </div>
        </ul>
      </div>
      <div className="flex justify-between p-4">
        <button className="btn btn-primary " onClick={saveProfile}>
          Save Profile
        </button>
        <button className="btn btn-danger" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
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
