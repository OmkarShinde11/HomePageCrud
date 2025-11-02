import React, { useState } from 'react'
import useCoreUsp from '../feature/Corr-Usp/useCoreUsp'
import { Button, Card, CardActions, IconButton, CardContent, CardMedia, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Heading from './Heading';


export default function CoreUsp() {
    const {isLoading,coreUsp=[]}=useCoreUsp();
    console.log(coreUsp);

    if(coreUsp.length===0){
      return (
        <div className='py-5'>
          <Heading>Currently No Date Available For Core Usp Section, Contact Your Admin</Heading>
        </div>
      )
    }

  return (
    <div className='pt-8'>
    <Heading>Core Usp</Heading>
    <div className="relative w-full flex justify-center items-center pt-6 pr-6 pl-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreUsp?.map((item) => (
            <Card
            key={item._id}
            className="!bg-amber-200 !rounded-2xl !shadow-lg hover:!shadow-2xl transition-shadow duration-300 flex-shrink-0 w-[300px]"
          >
            <CardMedia
              sx={{ height: 180 }}
              image={item.Image}
              title={item.title}
              className="bg-gray-100"
              />
            <CardContent className="text-center p-4">
              <Typography
                variant="h6"
                className="font-semibold text-black mb-2"
              >
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
