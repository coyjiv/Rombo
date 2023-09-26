import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { faker } from "@faker-js/faker"; 
import Image from "next/image";
import { PagesContainer } from "@/components/layout/containers";

type Props = {};

const Music = () => {
  // Генерируем фейковые данные для страницы музыки
  const generateFakeMusicData = () => {
    const music = {
      currentSong: {
        title: faker.music.songName(),
        artist: faker.person.fullName(),
        genre: faker.music.genre(),
        coverImage: faker.image.image(),
      },
      songs: Array.from({ length: 10 }, () => ({
        title: faker.music.songName(),
        artist: faker.person.fullName(),
        duration: `${Math.floor(Math.random() * 5)}:${Math.floor(
          Math.random() * 60
        ).toString().padStart(2, "0")}`,
      })),
    };
    return music;
  };

  const musicData = generateFakeMusicData();

  return (
    <PagesContainer>
      <div className="flex justify-between p-4">
        <button
          className="text-white p-[6px] w-15 h-15 text-3xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 "
        >
          <BiArrowBack />
        </button>
        <button className="text-white p-[6px] w-15 h-15 text-2xl rounded-full duration-300transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 ">
          <FaEdit />
        </button>
      </div>

      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Music</h1>
        <div className="mb-8">
          <Image
            src={musicData.currentSong.coverImage}
            alt="Album Cover"
            width={1024}
            height={768}
            className=" rounded-lg shadow-md"
          />
          <h2 className="text-xl font-semibold mt-2">
            {musicData.currentSong.title}
          </h2>
          <p className="text-gray-400">{musicData.currentSong.artist}</p>
          <p className="text-gray-400">{musicData.currentSong.genre}</p>
        </div>

        <h2 className="text-xl font-bold mb-2">Songs</h2>
        <ul>
          {musicData.songs.map((song, index) => (
            <li key={index} className="mb-2">
              <span className="text-gray-400">
                {index + 1}. {song.title}
              </span>{" "}
              - {song.artist} ({song.duration})
            </li>
          ))}
        </ul>
      </div>
    </PagesContainer>
  );
};

export default Music;