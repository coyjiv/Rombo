import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import React, { useState } from "react";
import ChatList from "./ChatList";
import { BiSearchAlt2 } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

type Props = {};

const Sidebar = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchIcon, setIsSearchIcon] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsSearchIcon(e.target.value === ""); // Устанавливаем true, если поле пусто, иначе false
  };

  const handleClearClick = () => {
    console.log("Clear button clicked");
    setSearchText('');
    setIsSearchIcon(true); // Возвращаем иконку поиска
  };

  return (
    <div className="drawer flex overflow-y-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-content  min-h-screen bg-dark-purple p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border rounded-lg py-3 px-3  text-white bg-purple-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search"
              value={searchText}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-1 right-2 flex items-center ">
              <div className="text-white text-2xl rounded-full py-3 px-2 overflow-hidden">
                {!isSearchIcon && (
                  <button className="absolute inset-y-0 right-0 py-3 px-2 rounded-full bg-dark-purple w-10 h-10  " onClick={handleClearClick}>
                  <RxCross1 />
                </button>
                  
                )}
                {isSearchIcon && <BiSearchAlt2 />}
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