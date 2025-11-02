import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteFaq as deleteFaqApi } from "../../Service/faqService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteFaq(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteFaq}=useMutation({
        mutationFn:(id)=>deleteFaqApi(id),
        onSuccess:()=>{
            toast.success('Faq Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['faq'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while deleting the faq')
            }
        }
    });

    return {isDeleting,deleteFaq};
}