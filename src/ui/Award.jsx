import React from 'react'
import useAward from '../feature/Award/useAward';
import { Card,CardMedia,Grid } from '@mui/material';
import Heading from './Heading';

export default function Award() {
    const {isLoading,awardData=[]}=useAward();
    console.log(awardData);

    if(awardData.length===0){
      return (
        <div className='py-5'>
          <Heading>Currently No Date Available For Award Section, Contact Your Admin</Heading>
        </div>
      )
    }
  return (
    <div className="pt-8">
    <Heading>Awards</Heading>

    <Grid container spacing={4} justifyContent="center">
      {awardData?.map((award) => (
        <Grid item key={award._id} xs={12} sm={6} md={4} lg={3}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardMedia
              component="img"
              image={award.Image}
              alt={`Award ${award._id}`}
              sx={{
                height: 200,      // fixed height in px
                objectFit: 'cover', // maintain aspect ratio and crop if needed
              }}
              className="object-cover"
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  )
}
