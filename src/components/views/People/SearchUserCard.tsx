import { User } from "@/types";
import Image from "next/image";

export const SearchUserCard = ({ user }: { user: User }) => (
  <li
    key={user?.id}
    className="cursor-pointer flex rounded-lg shadow-xl p-4 bg-gradient-to-br from-medium-light-purple to-bold-medium-purple"
  >
    <div className="mr-4">
      <Image
        height={80}
        width={80}
        className="rounded-full shadow-slate-800"
        alt="Avatar"
        src={user?.avatar ?? "/img/avatar.webp"}
      />
    </div>
    <div className="flex flex-grow justify-between">
      <div className="flex flex-col justify-between">
        <p className="text-xl sm:text-md md:text-lg lg:text-xl text-white font-semibold">
          {user.fullName}
        </p>
        <p className="text-white sm:text-sm md:text-md lg:text-lg">
          {user.nickname}
        </p>
      </div>
      <div className="flex items-center">
        <button onClick={async()=>{
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
        }} className="btn bg-medium-purple border-super-dark-purple border-2 text-white py-2 lg:py-2 px-4 lg:px-6 mr-4 ">
          Add
        </button>
      </div>
    </div>
  </li>
);
