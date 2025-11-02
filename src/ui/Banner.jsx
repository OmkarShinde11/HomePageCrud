import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence,useAnimation } from "framer-motion";
import getBanners from '../Service/bannerService';
import useBanners from '../feature/Banner/useBanner';
import Heading from './Heading';


export default function Banner() {
    const [current, setCurrent] = useState(0);
    const {isLoading,bannerData=[]}=useBanners();
    // console.log(bannerData);
    useEffect(()=>{
      const timer=setInterval(()=>{
        setCurrent((prev)=>(prev+1) % bannerData.length);
        // nextSlide();
      },4000);
  
      return ()=>{clearInterval(timer);};
    },[bannerData]);

    if(bannerData.length===0){
      return (
        <div className='py-5'>
          <Heading>Currently No Date Available For Banner Section, Contact Your Admin</Heading>
        </div>
      )
    }
  return (
    <div className="relative w-[100%] h-[80vh] overflow-hidden">
    <motion.div
      className="flex w-full h-full"
      animate={{ x: `-${current * 100}%` }}
      transition={{ ease: "easeInOut", duration: 2 }}
    >
      {bannerData.map((banner) => (
        <div
          key={banner._id}
          className="min-w-full h-full relative flex-shrink-0"
        >
          <img
            src={banner.Image}
            alt={banner.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-amber-100 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {banner.title}
            </h1>
            <p className="text-lg md:text-2xl">{banner.subtitle || ''}</p>
            {banner.ctaLink && (
                <a
                  href={banner.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black px-6 py-3 bg-amber-300 font-semibold rounded-full shadow-lg hover:bg-amber-400 transition-all duration-300"
                >Redirect</a>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  </div>
  )
}
