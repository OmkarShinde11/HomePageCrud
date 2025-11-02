import React, { useEffect, useState } from "react";
import useKeyDifferenciators from "../feature/KeyDifferenciators/useKeyDifferenciators";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  IconButton
} from "@mui/material";
import Heading from "./Heading";


export default function KeyDifferenciators() {
    const [current,setCurrent]=useState(0);
  const { isLoading, differenciators=[] } = useKeyDifferenciators();
  console.log(differenciators);

//   useEffect(()=>{
//     const timer=setInterval(()=>{
//         if(differenciators.length===0)return;
//         handleNext();
//     },4000)
//     return ()=>clearInterval(timer);
//   },[current,differenciators.length]);

  function handleNext(){
    setCurrent((prev) => (prev + 1) % differenciators.length);
  }
  function handlePrev(){
    setCurrent((prev) => (prev - 1 + differenciators.length) % differenciators.length);
  }

  if(differenciators.length===0){
    return (
      <div className='py-5'>
        <Heading>Currently No Date Available For Key Differenciators Section, Contact Your Admin</Heading>
      </div>
    )
  }

  return (
    <>
    <Heading>Key Differenciators</Heading>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 pr-6 pl-6">
      {differenciators?.map((item) => (
        <Card
          key={item._id}
          className="shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 !bg-amber-200"
          sx={{ maxWidth: 345 }}
          >
          <CardMedia
            sx={{ height: 180 }}
            image={item.Image}
            title={item.title}
          />
          <CardContent className="bg-amber-200">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="text-black font-semibold"
              >
              {item.title}
            </Typography>
            <Typography variant="body2" className="text-gray-800">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
    </>

//     <div className="relative w-full max-w-5xl mx-auto mt-10">
//     {/* Navigation Buttons */}
//     <IconButton
//       onClick={handlePrev}
//       className="!absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 z-10"
//     >
//       <ChevronLeft />
//     </IconButton>

//     <IconButton
//       onClick={handleNext}
//       className="!absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 z-10"
//     >
//       <ChevronRight />
//     </IconButton>

//     {/* Carousel Content */}
//     <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={differenciators?.[current]?._id}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -100 }}
//           transition={{ duration: 0.6 }}
//           className="flex justify-center flex-grow-0"
//         >
//           <Card
//             className="w-full sm:w-[400px] bg-amber-50 shadow-xl rounded-2xl overflow-hidden border border-gray-200"
//           >
//             <CardMedia
//               component="img"
//               image={differenciators[current]?.Image}
//               alt={differenciators[current]?.title}
//               className="object-cover w-52 h-52"
//             />
//             <CardContent className="text-center">
//               <Typography variant="h6" className="font-bold text-gray-800">
//                 {differenciators[current]?.title}
//               </Typography>
//               <Typography variant="body2" className="text-gray-600 mt-2">
//                 {differenciators[current]?.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </AnimatePresence>
//     </div>

//     {/* Dots Indicator */}
//     <div className="flex justify-center mt-4 space-x-2">
//       {differenciators.map((_, index) => (
//         <div
//           key={index}
//           onClick={() => setCurrent(index)}
//           className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
//             current === index ? "bg-amber-500 scale-110" : "bg-gray-300"
//           }`}
//         ></div>
//       ))}
//     </div>
//   </div>

  );
}
