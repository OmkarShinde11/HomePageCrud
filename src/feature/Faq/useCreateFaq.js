import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createFaq as createFaqApi } from "../../Service/faqService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useCreateFaq(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isCreating,mutate:createFaq}=useMutation({
        mutationFn:(data)=>createFaqApi(data),
        onSuccess:()=>{
            toast.success('Faq Created Successfully');
            queryClient.invalidateQueries({
                queryKey:['faq'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Created Faq')
            }
        }
    });
    return {isCreating,createFaq};
}