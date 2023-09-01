import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const generateFakeChatData = () => {
  const chatData = [];
  for (let i = 1; i <= 10; i++) {
    const chat = {
      id: i,
      name: faker.person.fullName(),
      lastMessage: faker.lorem.sentence(),
    };
    chatData.push(chat);
  }
  return chatData;
};

const ChatList = ({ searchText }) => {
  // Используем useState для хранения данных о чатах
  const [chatData, setChatData] = useState([]);

  // Генерируем моковые данные только при монтировании компонента
  useEffect(() => {
    const generatedData = generateFakeChatData();
    setChatData(generatedData);
  }, []);

  const filteredChats = chatData.filter((chat) =>
  chat.name.toLowerCase().includes(searchText.toLowerCase())
);

  return (
    <div className="bg-purple-900 text-white p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2 pl-4 ">Chats</h2>
      <ul>
      {filteredChats.map((chat) => (
        
          <li
            
            key={chat.id}
            className="mb-4 p-4 rounded-lg hover:bg-purple-800 duration-300 border border-dark-purple"
          >
            <div className="font-semibold text-lg mb-1">{chat.name}</div>
            <div className="text-gray-300">{chat.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;