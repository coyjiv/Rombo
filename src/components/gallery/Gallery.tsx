import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { RxCross1 } from "react-icons/rx";

const Gallery = ({ images, isOpen, onClose }:any) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full  flex justify-center items-center ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className={`absolute top-0 left-0 w-full h-full bg-black opacity-70 duration-100 ${isOpen ? "visible" : "invisible"}`} onClick={onClose}></div>
      <div className={`relative z-10 w-full max-w-lg bg-dark-purple p-10 rounded-lg shadow-md transform ${isOpen ? "scale-100" : "scale-0"} transition-transform duration-300 ease-in-out`}>
        <button
          className="absolute text-white top-2 right-2 rounded-full hover:bg-medium-purple p-2 duration-300 text-xl"
          onClick={onClose}
        >
          <RxCross1 />
        </button>
        <ImageGallery
          showPlayButton={false}
          showFullscreenButton={false}
          items={images}
        />
      </div>
    </div>
  );
};

export default Gallery;