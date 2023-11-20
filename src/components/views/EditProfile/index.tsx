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
import { updateProfile } from "@/app/actions/user";
import { useGetUserProfile } from "@/helpers/useGetUserProfile";
import { PagesContainer } from "@/components/layout/containers";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";
import { updateAvatar } from "@/app/slices/userSlice";

const EditProfile = ({
  setIsEditing,
  profileData,
  notifyError,
  notifySuccess,
}: any) => {
  const dispatch = useAppDispatch();

  console.log("profileData", profileData);

  const firstName = profileData?.firstName;
  const lastName = profileData?.lastName;

  const [selectedImage, setSelectedImage] = useState(
    profileData?.avatar ?? "/img/avatar.webp"
  );

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const profileValues = {
    firstName: profileData?.firstName ?? "",
    lastName: profileData?.lastName ?? "",
    bio: profileData?.bio ?? "",
    phone: profileData?.phone ?? "",
    nickname: profileData?.nickname ?? "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      // .required("First name is required")
      .matches(
        /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ]+$/,
        "First name should contain only letters"
      ),

    lastName: Yup.string().matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ]+$/,
      "Last name should contain only letters"
    ),
    phone: Yup.string().matches(/^\+?\d+$/, "Invalid phone number format"),
    // .required("Phone number is required")
    nickname: Yup.string().min(
      3,
      "Nickname should be at least 3 characters long"
    ),
  });

  const saveProfile = async (values: UserProfile) => {
    try {
      const updatedProfileData = {
        ...profileData,
        fullName: `${values.firstName} ${values.lastName}`,
        bio: values.bio || "",
        phone: values.phone || "",
        nickname: values.nickname || "",
      };

      dispatch(
        updateProfile({ old: profileData, newUser: updatedProfileData })
      );
      notifySuccess();
      setIsEditing(false);
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
      notifyError();
    }
  };

  return (
    <PagesContainer className="text-white ">
      <button
        onClick={handleCancelEdit}
        className="text-white p-[6px]  text-3xl rounded-full duration-300transition ease-in-out bg-dark-purple  hover:bg-super-purple  hover:-translate-y-1 hover:scale-110 duration-300 "
      >
        <BiArrowBack />
      </button>

      <CldUploadWidget
        uploadPreset="hheznuwk"
        onUpload={(res) => {
          // @ts-ignore
          if (res.event === "success" && res?.info?.url)
            // @ts-ignore
            dispatch(updateAvatar(res.info?.url));
          fetch("/api/profile/changeAvatar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // @ts-ignore
            body: JSON.stringify({ avatar: res.info?.url }),
          });
        }}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }
          return (
            <div onClick={handleOnClick} className="flex my-10">
              <Image
                className="rounded-xl w-72 h-72 cursor-pointer ml-4"
                alt="Avatar"
                src={profileData?.avatar ?? "/img/avatar.webp"}
                width={300}
                height={300}
              />

              <button>
                <RxAvatar className="text-blue-800 bg-blue-400 text-5xl relative right-6 top-3 hover:shadow-custom rounded-full duration-500" />
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
      <Formik
        initialValues={profileValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          saveProfile(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="rounded-lg">
            {/* First name */}
            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple rounded-t-lg duration-300  p-4">
              <li className="list-none font-bold">First name</li>
              <Field
                placeholder={firstName}
                value={values.firstName}
                type="text"
                id="firstName"
                name="firstName"
                className={`py-2 bg-gray-600 w-full rounded-lg ${
                  errors.firstName && touched.firstName ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* <ErrorMessage name="name" component="div" /> */}

            {/* Last name (optional) */}
            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
              <li className="list-none font-bold">Last name (optional)</li>
              <Field
                placeholder={lastName}
                value={values.lastName}
                type="text"
                id="lastName"
                name="lastName"
                className={`py-2 bg-gray-600 w-full rounded-lg ${
                  errors.lastName && touched.lastName ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* <ErrorMessage name="bio" component="div" /> */}

            {/* Bio */}
            <div className=" cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
              <li className="list-none font-bold">Bio</li>
              <Field
                placeholder={profileData?.bio ?? ""}
                value={values.bio}
                type="text"
                id="bio"
                name="bio"
                className="py-2 bg-gray-600 w-full rounded-lg"
              />
            </div>

            {/* Email */}
            {/* <div className="hidden cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
            <li className="list-none font-bold">Email</li>
            <Field
              placeholder={profileData?.email}
              value={values.email}
              type="text"
              id="email"
              name="email"
              className="py-2 bg-gray-600 w-full rounded-lg"
            />
          </div> */}

            {/* Phone number */}
            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4">
              <li className="list-none font-bold">Phone number</li>
              <Field
                placeholder={profileData?.phone}
                value={values.phone}
                type="text"
                id="phone"
                name="phone"
                className={`py-2 bg-gray-600 w-full rounded-lg ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
              />
            </div>

            {/* Nickname */}
            <div className="cursor-pointer hover:bg-opacity-60 bg-dark-purple duration-300 p-4 rounded-b-lg">
              <li className="list-none font-bold">Nickname</li>
              <Field
                placeholder={profileData?.nickname}
                value={values.nickname}
                type="text"
                id="nickname"
                name="nickname"
                className="py-2 bg-gray-600 w-full rounded-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between p-4">
              <button
                className="btn btn-primary border-dark-purple bg-gradient-to-r transition-all w-full sm:w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/12 max-w-full from-super-purple via-purple-700 to-super-dark-purple rounded-lg shadow-md hover:from-super-purple hover:via-purple-700 hover:to-super-dark-purple ease-in-out hover:duration-700 bg-pos-0 hover:bg-pos-50 bg-size-200 text-white mb-2 sm:mb-0"
                type="submit"
              >
                Save Profile
              </button>
              <button
                className="btn btn-danger border-dark-purple bg-gradient-to-r transition-all w-full sm:w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/12 max-w-full from-super-purple via-purple-700 to-super-dark-purple rounded-lg shadow-md hover:from-super-purple hover:via-purple-700 hover:to-super-dark-purple ease-in-out hover:duration-700 bg-pos-0 hover:bg-pos-50 bg-size-200 text-white"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {isGalleryOpen && (
        <Gallery
          // images={galleryImages}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </PagesContainer>
  );
};

export default EditProfile;
