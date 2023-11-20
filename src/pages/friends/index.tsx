import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PagesContainer } from "@/components/layout/containers";
import { findFriend} from "@/app/actions/users";
import { BackArrow, SearchButton } from "@/components/buttons";
import { RxAvatar, RxButton } from "react-icons/rx";
import SkeletonItem from "@/components/SkeletonItem";
import { User } from "@/types";
import { SearchFriendResults } from "@/components/views/Friends/SearchFriendResults";
import { useSession } from "next-auth/react";
import { IUser } from "@/mongo/models/User";

interface FriendsProps {
  friends: IUser[];
}

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

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const friends = await findFriend('', userEmail);
        setSearchResults(friends);
        setShowNoFriendsFound(friends?.length === 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    if (searchResults.length === 0) {
      fetchFriends();
    }
  }, [userEmail, searchResults]);

  const onSubmit = async (values: { searchString: string }) => {
    setLoading(true);
    try {
      const friends = await findFriend(values?.searchString || "", userEmail);
      setSearchResults(friends);
      setShowNoFriendsFound(friends?.length === 0);
    } catch (error) {
      console.error('Error fetching friends:', error);
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
                placeholder="Search for users..."
                className="mr-2 p-2  w-5/6   rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              />
              <SearchButton loading={loading}/>
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
          <SearchFriendResults searchString={searchString} searchResults={searchResults} />
        )}
      </div>
    </PagesContainer>
  );
};

export default Friends;

