import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PagesContainer } from "@/components/layout/containers";
import { findUser } from "@/app/actions/users";
import { BackArrow, SearchButton } from "@/components/buttons";

import Image from "next/image";
import { RxAvatar, RxButton } from "react-icons/rx";

import SkeletonItem from "@/components/SkeletonItem";
import { User } from "@/types";
import { SearchResults } from "@/components/views/People/SearchResults";

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
      setShowNoUsersFound(users?.length === 0);
      setShowNoUsersFound(users?.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Avatar = <RxAvatar />;
  useEffect(() => {
    if (searchString.length > 0) {
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
          <Form className="flex justify-center items-center mt-4 p-4">
            <div className="p-4 w-full bg-dark-purple bg-opacity-70 rounded-lg flex items-center">
              <Field
                value={searchString}
                onChange={(e: any) =>
                  e.target.value !== searchString &&
                  setSearchString(e.target.value)
                }
                type="text"
                name="searchString"
                placeholder="Search for users..."
                className="mr-2 p-2  w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3  rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              />
              <SearchButton loading={loading}/>
            </div>
          </Form>
        )}
      </Formik>
      <div className="my-12 mx-4">
        {loading ? (
          <div>
            <ul className="space-y-4">
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </ul>
          </div>
        ) : (
          <SearchResults searchResults={searchResults} />
        )}
      </div>
    </PagesContainer>
  );
};

export default PeoplePage;
