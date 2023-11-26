import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PagesContainer } from "@/components/layout/containers";
import { findFriend } from "@/app/actions/users";
import { BackArrow, SearchButton } from "@/components/buttons";
import { RxAvatar } from "react-icons/rx";
import SkeletonItem from "@/components/SkeletonItem";
import { User } from "@/types";
import { SearchFriendResults } from "@/components/views/Friends/SearchFriendResults";
import { useSession } from "next-auth/react";
import { IUser } from "@/mongo/models/User";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoFriendsFound, setShowNoFriendsFound] = useState(false);
  const [searchString, setSearchString] = useState("");

  const initialValues = {
    searchString: "",
  };

  const validationSchema = Yup.object({
    searchString: Yup.string().required("Search string is required"),
  });

  const { data: session } = useSession();
  const userEmail = session?.user?.email || '';

  const loadFriends = async () => {
    try {
      setLoading(true);
      const friends = await findFriend(searchString, userEmail);
      setSearchResults(friends);
      setShowNoFriendsFound(friends?.length === 0);
    } catch (error) {
      console.error("Error loading friends:", error);
    } finally {
      setLoading(false);
    }
  };
  
const onSubmit = async (values: { searchString: string }) => {
  setLoading(true);
  try {
    const friends = await findFriend(values.searchString, userEmail);
    setSearchResults(friends);
    setShowNoFriendsFound(friends?.length === 0);
  } catch (error) {
    console.error('Error fetching friends:', error);
  } finally {
    setLoading(false);
  }
};
  
  useEffect(() => {
    console.log("Первый 1 ефф")
    const fetchData = async () => {
      if (searchString.length > 0) {
        await loadFriends();
      }
    };
  
    fetchData();
  }, [userEmail, searchString]); 
  
  useEffect(() => {
    console.log("Второй 2 ефф")
    loadFriends();
  }, []);

  return (
    <PagesContainer>
      <div className="p-4">
        <BackArrow />
      </div>
      <h1 className="p-4 text-3xl text-white font-bold mb-4">Friends</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form className="flex justify-center items-center mt-4 p-4">
            <div className="p-2 w-full bg-dark-purple bg-opacity-70 rounded-lg flex items-center">
              <Field
                value={searchString}
                onChange={(e: any) =>
                  e.target.value !== searchString &&
                  setSearchString(e.target.value)
                }
                type="text"
                name="searchString"
                placeholder="Search for friends..."
                className="mr-2 p-2  w-5/6   rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              />
              <SearchButton loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
      <div className="my-12 mx-4">
        {loading ? (
          <ul className="divide-y divide-gray-100">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </ul>
        ) : (
          <SearchFriendResults
            searchString={searchString}
            searchResults={searchResults}
          />
        )}
      </div>
    </PagesContainer>
  );
};

export default Friends;