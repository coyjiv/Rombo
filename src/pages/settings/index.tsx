import DarkModeButton from "@/buttons/DarkModeButton";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="w-full p-4 mt-12 rounded-lg bg-medium-purple shadow-2xl">
      <div className="flex justify-between p-4">
        <button
          onClick={()=>{}}
          className="text-white p-[6px] w-15 h-15 text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
        >
          <BiArrowBack />
        </button>
      </div>

      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Настройки</h1>

        {/* Темная тема */}
        <div className="flex items-center mb-4">
          <span className="text-xl">Темная тема</span>
          <label className="ml-4 flex items-center">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="form-checkbox h-6 w-6 text-purple-600 rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:ring focus:ring-purple-200"
            />
            <span className="ml-2 text-gray-400">Включить</span>
          </label>
        </div>

        {/* Уведомления */}
        <div className="flex items-center mb-4">
          <span className="text-xl">Уведомления</span>
          <label className="ml-4 flex items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
              className="form-checkbox h-6 w-6 text-purple-600 rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:ring focus:ring-purple-200"
            />
            <span className="ml-2 text-gray-400">Включить уведомления</span>
          </label>
        </div>
        <DarkModeButton />
      </div>
    </div>
  );
};

export default Settings;
