import { BackArrow } from "@/components/buttons";
import { PagesContainer } from '@/components/layout/containers'
import React from 'react'


 const ChatsPage = () => {
  
  return (
    <PagesContainer>
       <div className="flex justify-between p-4">
        <BackArrow />
      </div>  
    </PagesContainer>
  )
}

export default ChatsPage;