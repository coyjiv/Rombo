import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PagesContainer } from "@/components/layout/containers";
import { findUser } from "@/app/actions/users";
import BackArrow from "@/buttons/BackArrow";
import Image from "next/image";
import { RxButton } from "react-icons/rx";

const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoUsersFound, setShowNoUsersFound] = useState(false);

  const initialValues = {
    searchString: "",
  };

  const validationSchema = Yup.object({
    searchString: Yup.string().required("Search string is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const users = await findUser(values.searchString);
      setSearchResults(users);
      setShowNoUsersFound(users.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagesContainer>
      <div className="flex justify-between p-4">
        <BackArrow />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form className="flex justify-center items-center mt-4">
            <Field
              type="text"
              name="searchString"
              placeholder="Search for users..."
              className="mr-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
           

           <button
  type="submit"
  disabled={loading}
  className="bg-gradient-to-r transition-all from-purple-500 via-indigo-500 to-blue-500  rounded-lg shadow-md hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 ease-in-out hover:duration-500 bg-pos-0 hover:bg-pos-100 bg-size-200 text-white py-3 px-6"
>
  {loading ? "Searching..." : "Search"}
</button>

          </Form>
        )}
      </Formik>
      <div className="my-12 mx-4">
        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <ul className="space-y-4">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer flex rounded-lg shadow-xl p-4 bg-gradient-to-br from-purple-800 to-indigo-900"
                >
                  <div className="mr-4">
                    <Image
                      height={100}
                      width={100}
                      className="rounded-full shadow-slate-800"
                      alt="Avatar"
                      src={user?.avatar ?? "/img/avatar.webp"}
                    />
                  </div>
                  <div className="flex flex-grow justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="text-xl text-white font-semibold">
                        {user.fullName}
                      </p>
                      <p className="text-white">{user.nickname}</p>
                    </div>
                    <div className="flex items-center">
                      <button className="btn bg-dark-purple text-white py-2 lg:py-4 px-6 lg:px-12 ">
                        Add
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : showNoUsersFound ? (
          <div className="text-center mt-8 text-white">No users found.</div>
        ) : null}
      </div>
    </PagesContainer>
  );
};

export default PeoplePage;