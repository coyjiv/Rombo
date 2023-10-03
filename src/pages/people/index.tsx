import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PagesContainer } from "@/components/layout/containers";
import { findUser } from "@/app/actions/users";
import BackArrow from "@/components/buttons";
import Image from "next/image";
import { RxAvatar, RxButton } from "react-icons/rx";
import debounce from "lodash/debounce";
import SkeletonItem from "@/components/SkeletonItem";
import { User } from "@/types";
import {SearchResults} from "@/components/views/People/SearchResults";

const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoUsersFound, setShowNoUsersFound] = useState(false);
  const [searchString, setSearchString] = useState(""); // Добавляем состояние для поисковой строки

  const initialValues = {
    searchString: "",
  };

  const validationSchema = Yup.object({
    searchString: Yup.string().required("Search string is required"),
  });

  const onSubmit = async () => {
    setLoading(true);

    try {
      const users = await findUser(searchString);
      setSearchResults(users);
      setShowNoUsersFound(users.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Avatar = <RxAvatar />;
  useEffect(() => {
    if (searchString.length>0) {
      onSubmit();
    }
  }, [searchString]);



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
          <div className="p-4 bg-dark-purple w-fit bg-opacity-70 rounded-lg flex items-center">
            <Field
              value={searchString}
              onChange={(e: any) =>
                e.target.value !== searchString && setSearchString(e.target.value)
              }
              type="text"
              name="searchString"
              placeholder="Search for users..."
              className="mr-2 p-2 w-2/3 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
        
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r transition-all w-1/3 from-purple-500 via-indigo-500 to-blue-500  rounded-lg shadow-md hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 ease-in-out hover:duration-500 bg-pos-0 hover:bg-pos-100 bg-size-200 text-white py-3 px-6"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </Form>
        )}
      </Formik>
      <div className="my-12 mx-4">
        {loading ? (
          <div>
            <ul className="space-y-4">
              <SkeletonItem/>
              <SkeletonItem/>
              <SkeletonItem/>
              <SkeletonItem/>
            </ul>
          </div>
        ):
          <SearchResults searchResults={searchResults} />
        }
      </div>
    </PagesContainer>
  );
};

export default PeoplePage;