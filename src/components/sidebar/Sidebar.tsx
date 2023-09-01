import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import React, { useState } from "react";
import ChatList from "./ChatList";
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {};

const Sidebar = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="drawer flex">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-content w-1/3 min-h-screen bg-dark-purple p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border rounded-lg py-2 px-3 text-white bg-purple-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="text-white text-xl">
                <BiSearchAlt2 />
              </div>
            </div>
          </div>

          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button"
          >
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </label>
        </div>

        <ChatList searchText={searchText} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay">
          {" "}
        </label>
        <ul className="menu p-4 w-80 min-h-full bg-dark-purple text-base-content text-2xl">
          <Link href="/profile">
            <li className="mb-4">
              <a className="hover:text-primary">Profile</a>
            </li>
          </Link>
          <Link href="/friends">
            <li className="mb-4">
              <a className="hover:text-primary">Friends</a>
            </li>
          </Link>
          <Link href="/music">
            <li className="mb-4">
              <a className="hover:text-primary">Music</a>
            </li>
          </Link>
          <Link href="/settings">
            <li className="mb-4">
              <a className="hover:text-primary">Settings</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;