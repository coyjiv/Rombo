import React, { useRef, useState } from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import Gallery from "@/components/gallery/Gallery";

const EditProfile = ({ setIsEditing, profileData, setProfileData, openGallery }: any) => {
  const [editedProfileData, setEditedProfileData] = useState({
    ...profileData,
  });
  const [selectedImage, setSelectedImage] = useState("/img/avatar.webp");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleSaveProfile = () => {
    setProfileData(editedProfileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfileData({ ...profileData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRxAvatarClick = () => {
    imageInputRef.current.click();
  };
  
  const handleImageClick = () => {
    setIsGalleryOpen(true);
  };
  const galleryImages = [
    {
      original: selectedImage,
      thumbnail: selectedImage,
    },
  ];

  return (
    <div className="w-full mt-12 rounded-lg bg-medium-purple shadow-2xl p-4 text-white">
      <div className="flex ml-10">
        {selectedImage && (
          <Image
            onClick={handleImageClick}
            className="rounded-xl w-full shadow-slate-800 shadow-md cursor-pointer ml-4"
            alt="Avatar"
            src={selectedImage}
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
        <button onClick={handleRxAvatarClick}>
          <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
        </button>
      </div>
      <div>
        <ul className="grid gap-4 p-4 text-white">
          <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 rounded-lg p-4">
            <li className="font-bold">Name</li>
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
            <li className="font-bold">Bio</li>
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
        <button className="btn btn-primary " onClick={handleSaveProfile}>
          Save Profile
        </button>
        <button className="btn btn-danger" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
      {isGalleryOpen && (
        <Gallery
          images={galleryImages}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default EditProfile;
