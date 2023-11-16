import { useAppSelector } from "@/app/hooks";
import { IUser } from "@/mongo/models/User";
import { User } from "@/types";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const SearchUserCard = ({ user }: { user: IUser }) => {
  const { data } = useSession();
  const isPending = user.potentialFriends.includes(data?.user?.email as string);
  const isFriends = user.friends.includes(data?.user?.email as string);
  const sendFriendRequest = async () => {
    const res = await fetch("/api/people/sendFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const declineFriendRequest = async () => {
    const res = await fetch("/api/people/declineFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const removeFromFriends = async () => {
    const res = await fetch("/api/people/removeFromFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const addToFriends = async () => {
    const res = await fetch("/api/people/acceptFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const actionButton = isFriends ? (
    <button className="text-white" onClick={removeFromFriends}>Remove from friends</button>
  ) : isPending ? (
    <button className="text-white" onClick={declineFriendRequest}>Cancel friend request</button>
  ) : (
    <button className="text-white" onClick={sendFriendRequest}>Add</button>
  );

  return (
    <li className="relative shadow-gray-600 shadow-md rounded-lg gap-x-4 px-2 py-5 sm:px-6 lg:px-8 hover:bg-light-purple2 bg-medium-light-purple duration-300">
      <div className="flex  last:items-center  min-w-0 gap-x-4">
        <Image
          height={80}
          width={80}
          className="rounded-full flex-none"
          alt="Avatar"
          src={user?.avatar ?? "/img/avatar.webp"}
        />
        <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6">
          <a href={user.fullName} className="text-xl sm:text-md md:text-lg lg:text-xl text-white font-semibold">
          <span className="absolute inset-x-0 -top-px bottom-0" />
            {user.fullName}
          </a>
        </p>
          <p className="text-white mt-1 flex text-xs leading-5 ">
          <a href={user.nickname} className="relative truncate hover:underline">
          {user.nickname}
                </a>
           
          </p>
        
        </div>
        <div className="flex items-center">
          {/* {!isPending ? (
            <button
              onClick={}
              className="rounded-full bg-super-dark-purple duration-300 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          ) : isFriends ? (
            <span>remove friend</span>
          ) : (
            <span>pending</span>
          )} */}
          {actionButton}
        </div>
        <ChevronRightIcon className="h-5 w-5 flex  text-gray-400" aria-hidden="true" />
      </div>
    </li>
  );
};
