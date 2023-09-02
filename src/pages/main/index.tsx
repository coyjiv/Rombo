import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

type Props = {}

const Main = (props: Props) => {
  return (
    <div className="flex">
      <div className="lg:w-1/3   bg-dark-purple overflow-y-auto" >
        <Sidebar/>
      </div>
      <div className="lg:w-2/3  sm:hidden overflow-y-auto">
       dsa
      </div>
    </div>
  )
}

export default Main