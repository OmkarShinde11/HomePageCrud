import React from "react";
import useFaq from "../feature/Faq/useFaq";
import Heading from "./Heading";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Faq() {
  const { isLoading, faqData=[] } = useFaq();
  console.log(faqData);

  if(faqData.length===0){
    return (
      <div className='py-5'>
        <Heading>Currently No Date Available For Faq Section, Contact Your Admin</Heading>
      </div>
    )
  }
  return (
    <div className="pt-8">
      <Heading>Faq</Heading>
      <div className="pl-6 pr-6">
        {faqData.map((item, index) => (
        <Accordion key={item._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            className="!bg-amber-200"
          >
            <Typography component="span" className="space-x-3">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails className="!bg-amber-200 border-t-4 border-amber-500">
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </div>
    </div>
  );
}
