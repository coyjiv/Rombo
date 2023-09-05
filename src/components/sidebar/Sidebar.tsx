import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import React, { useState } from "react";
import ChatList from "./ChatList";
import { BiSearchAlt2 } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import Profile from "@/pages/profile";
import Friends from "@/pages/friends"; 
import Music from "@/pages/music"; 
import Settings from "@/pages/settings"; 


const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [currentPage, setCurrentPage] = useState("chatList"); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsSearchIcon(e.target.value === "");
  };

  const handleClearClick = () => {
    setSearchText('');
    setIsSearchIcon(true);
  };

  const handleBackToChatList = (pageName: string) => {
    setCurrentPage(pageName);
  };

  const handleProfileClick = () => {
    handleBackToChatList("profile");
  };

  const handleFriendsClick = () => {
    handleBackToChatList("friends");
  };

  const handleMusicClick = () => {
    handleBackToChatList("music");
  };

  const handleSettingsClick = () => {
    handleBackToChatList("settings");
  };

  
  let currentContent;

switch (currentPage) {
  case "profile":
    currentContent = <Profile handleBackToChatList={handleBackToChatList}/>;
    break;
  case "friends":
    currentContent = <Friends handleBackToChatList={handleBackToChatList} />;
    break;
  case "music":
    currentContent = <Music handleBackToChatList={handleBackToChatList} />;
    break;
  case "settings":
    currentContent = <Settings handleBackToChatList={handleBackToChatList} />;
    break;
  default:
    currentContent = <ChatList searchText={searchText} />;
}


  return (
    <div className="drawer flex overflow-y-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-content min-h-screen bg-dark-purple bg-opacity-50 p-4 flex-1">
        <div className="flex gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border rounded-lg py-3 px-3 text-white bg-purple-800 bg-opacity-70 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search"
              value={searchText}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-1 right-2 flex items-center">
              <div className="text-white text-2xl rounded-full py-3 px-2 overflow-hidden">
                {!isSearchIcon && (
                  <button className="absolute inset-y-0 right-0 py-3 px-2 rounded-full bg-dark-purple w-10 h-10" onClick={handleClearClick}>
                    <RxCross1 />
                  </button>
                )}
                {isSearchIcon && <BiSearchAlt2 />}
              </div>
            </div>
          </div>

          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </label>
        </div>

        {currentContent}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay">
          {" "}
        </label>
        <ul className="menu p-4 w-1/4 min-h-full bg-dark-purple text-base-content text-2xl">
          <li className="mb-4" onClick={handleProfileClick}>
            <a className="hover:text-primary">Profile</a>
          </li>
          <li className="mb-4" onClick={handleFriendsClick}>
            <a className="hover:text-primary">Friends</a>
          </li>
          <li className="mb-4" onClick={handleMusicClick}>
            <a className="hover:text-primary">Music</a>
          </li>
          <li className="mb-4" onClick={handleSettingsClick}>
            <a className="hover:text-primary">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;