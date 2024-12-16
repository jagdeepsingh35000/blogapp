import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

export default function ViewOneBlog() {
    const location = useLocation().state;
    console.log(location)
  return (
    <div>
     <div><Navbar/></div>
     
<div className='flex items-center justify-center'>
<div className=" w-4/5 p-6 bg-white rounded-lg flex flex-col items-center  shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{location.title}</h1>
      <img className=" w-full xl:w-2/3 mx-h-auto object-cover rounded-lg mb-6" src={location.image.imageUrl} alt={location.title} />
      <div className="text-lg text-gray-700 leading-relaxed">
        {location.content}
      </div>
    
     </div>
</div>
     
    </div>
  )
}
