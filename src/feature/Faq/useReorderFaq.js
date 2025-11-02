import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderFaq as apiCall } from "../../Service/faqService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderFaq(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderFaq}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('Faq Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['faq'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the faq')
            }
        }
    });
    return {isReorder,reorderFaq};
}