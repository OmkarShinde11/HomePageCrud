import React from 'react'
import useInsurance from '../feature/Insurance/useInsurance'
import Heading from './Heading';
import { Card, CardMedia } from '@mui/material';

export default function Insurance() {
    const {isLoading,insuranceData=[]}=useInsurance();
    console.log(insuranceData);
    if(insuranceData.length===0){
      return (
        <div className='py-5'>
          <Heading>Currently No Date Available For Insurance Section, Contact Your Admin</Heading>
        </div>
      )
    }
  return (
    <div className='py-8 h-auto mt-10'>
        <Heading>Insurance Partners</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 pr-6 pl-6">
            {insuranceData.map((item)=>(
                <Card key={item?._id} className="hover:shadow-lg transition-shadow duration-300 !border-none !rounded-none">
                <CardMedia
                  component="img"
                  image={item.Image}
                  alt={`Award ${item._id}`}
                  sx={{
                    height: 100,      // fixed height in px
                    objectFit: 'cover', // maintain aspect ratio and crop if needed
                  }}
                  className="object-cover bg-amber-300 "
                />
              </Card>
            ))}
        </div>
    </div>
  )
}
