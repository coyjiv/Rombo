import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];


const Main = () => {
  return (
    <div className="flex">
      <div className="lg:w-1/3 bg-dark-purple overflow-y-auto" >
        <Sidebar/>
      </div>
      <div className="lg:w-2/3 text-white overflow-y-auto">
      <ImageGallery items={images} />
      </div>
    </div>
  )
}

export default Main