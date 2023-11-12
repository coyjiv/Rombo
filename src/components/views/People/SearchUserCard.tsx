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
      <button
        type="button"
        className="rounded-full bg-super-dark-purple duration-300 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add
      </button>
      </div>
    </div>
  </li>
);
