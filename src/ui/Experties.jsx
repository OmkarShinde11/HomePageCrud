import React from 'react'
import useExperties from '../feature/Experties/useExperties'
import Heading from './Heading';

export default function Experties() {
    const {isLoading,expertiesData=[]}=useExperties();
    console.log(expertiesData)

    if(expertiesData.length===0){
      return (
        <div className='py-5'>
          <Heading>Currently No Date Available For Experties Section, Contact Your Admin</Heading>
        </div>
      )
    }
  return (
    <div className='pt-8'>
    <h1 className="text-center text-2xl font-semibold text-amber-500 uppercase">Treatment Experties</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto pt-6 pr-6 pl-6">
        {expertiesData?.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-amber-200"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={item.Image}
                alt={item.title}
                className="w-full h-full object-cover bg-black"
              />
            </div>
            <div className="p-5 text-center bg-amber-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-800">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
