import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { RxCross1 } from "react-icons/rx";

const Gallery = ({ images, isOpen, onClose }) => {
  return (
    <div className={`image-gallery-container ${isOpen ? 'open' : ''}`}>
      <div
        className="image-gallery-background"
        onClick={onClose}
      ></div>
      <div className="image-gallery">
        <button
          className="rounded-full hover:bg-dark-purple duration-300 text-xl"
          onClick={onClose}
        >
          <RxCross1 />
        </button>
        <ImageGallery items={images} />
      </div>
    </div>
  );
};

export default Gallery;
