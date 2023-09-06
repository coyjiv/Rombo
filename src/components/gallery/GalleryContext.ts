import React, { createContext, useContext, useState } from 'react';

const GalleryContext = createContext();

export const useGalleryContext = () => {
  return useContext(GalleryContext);
};

export const GalleryProvider = ({ children }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <GalleryContext.Provider value={{ isGalleryOpen, openGallery, closeGallery }}>
      {children}
    </GalleryContext.Provider>
  );
};