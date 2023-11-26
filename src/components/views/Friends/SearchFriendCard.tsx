import { useAppSelector } from "@/app/hooks";
import { IUser } from "@/mongo/models/User";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SearchFriendCard = ({ user }: { user: IUser }) => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [isFriends, setIsFriends] = useState(user.friends.includes(data?.user?.email as string));
  const [isCurrentUser, setIsCurrentUser] = useState(user.email === data?.user?.email);

  const removeFromFriends = async () => {
    setLoading(true);
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
    setLoading(false);
    setIsFriends(false);
  };

  useEffect(() => {
    setIsCurrentUser(user.email === data?.user?.email);
  }, [user.email, data?.user?.email]);

  const actionButton = (
    <button className="text-white hidden sm:block md:block lg:block" onClick={removeFromFriends}>
      Remove from friends
    </button>
  );

  return (
    <li className="shadow-lg bg-dark-purple bg-opacity-40 rounded-lg gap-x-4 px-2 py-5 sm:px-2 lg:px-4 hover:bg-dark-purple duration-300">
      <div className="flex last:items-center min-w-0 gap-x-4">
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
            <p className="truncate hover:underline">{user.nickname}</p>
          </div>
        </div>
        <div className="flex items-center">
          {actionButton}
        </div>
        <div className="flex items-center">
        <ChevronRightIcon className="h-6 w-6 flex  text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
};