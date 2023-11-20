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
    const isCurrentUser = user.email === data?.user?.email;
    console.log(isCurrentUser, "this is Current user")
    
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

  const declineFriendRequest = async() => {
    console.log("Sending request with data:", {
      email: user.email,
    });
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
    console.log("Received response:", data);
    };

    const removeFromFriends = async () => {
      console.log("Removing from friends ");
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

    const acceptFriendRequest = async () => {
      console.log("Accepting friend request");
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
      <button className="text-white hidden cursor-pointer sm:block md:block lg:block" onClick={removeFromFriends}>
        Remove from friends
      </button>
    ) : isPending ? (
      // fix bug when user can accept request by himself without accepting by another user
      <>
        {!isCurrentUser && (
          <button className="text-white hidden cursor-pointer sm:block md:block lg:block" onClick={acceptFriendRequest}>
            Accept friend request
          </button>
        )}
        <button className="text-white hidden cursor-pointer sm:block md:block lg:block" onClick={declineFriendRequest}>
          Cancel friend request
        </button>
      </>
    ) : (
      <button className="text-white hidden cursor-pointer sm:block md:block lg:block" onClick={sendFriendRequest}>
        Add
      </button>
    );

    return (
      <li className="shadow-lg bg-dark-purple bg-opacity-40 rounded-lg gap-x-4 px-2 py-5 sm:px-2 lg:px-4 hover:bg-dark-purple duration-300">
      <div className="flex justify-between min-w-0 gap-x-4">
        <Image
          height={80}
          width={80}
          className="h-16 w-16 flex-none rounded-full"
          alt="Avatar"
          src={user?.avatar ?? "/img/avatar.webp"}
        />
        <div className="min-w-0 flex-auto">
          <div className="text-sm font-semibold leading-6">
            <p className="text-xl sm:text-md md:text-lg lg:text-xl text-white font-semibold">
              <span className="inset-x-0 -top-px bottom-0" />
              {user.fullName}
            </p>
          </div>
          <div className="text-white mt-1 flex text-xs leading-5">
            <p className="relative truncate hover:underline">
              {user.nickname}
            </p>
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          {actionButton}
        </div>
        <ChevronRightIcon className="h-5 w-5 flex items-c text-gray-400" aria-hidden="true" />
      </div>
    </li>
  );
};
