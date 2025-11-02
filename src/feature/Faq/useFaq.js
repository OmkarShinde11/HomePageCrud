import { useQuery } from "@tanstack/react-query";
import getFaqs from "../../Service/faqService";

export default function useFaq(){
    const {isLoading,data:faqData}=useQuery({
        queryKey:['faq'],
        queryFn:getFaqs,
    });
    return {isLoading,faqData};
}