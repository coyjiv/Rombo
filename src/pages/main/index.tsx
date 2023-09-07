import Sidebar from '@/components/sidebar/Sidebar'
import React, { useState } from 'react'
import Gallery from '@/components/gallery/Gallery'

const Main = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Состояние открытой галереи
  const [galleryImages, setGalleryImages] = useState([]); // Состояние изображений для галереи


  const openGallery = (images) => {
    setGalleryImages(images);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryImages([]);
    setIsGalleryOpen(false);
  };

  return (
    <div className="body flex min-h-screen  items-center justify-center min-w-min-320">
      <div className="lg:w-1/3 bg-dark-purple overflow-y-auto">
        <Sidebar openGallery={openGallery} /> 
      </div>
      <div className="lg:w-2/3 text-white overflow-y-auto">
    
      </div>
        <Gallery images={galleryImages} isOpen={isGalleryOpen} onClose={closeGallery} />
    </div>
  );
};

export default Main;