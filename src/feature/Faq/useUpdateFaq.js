import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBanner as updateBannerApi } from "../../Service/bannerService";
import { updateFaq as updateFaqApi } from "../../Service/faqService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateFaq(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateFaq}=useMutation({
        mutationFn:({id,data})=>updateFaqApi(id,data),
        onSuccess:()=>{
            toast.success('Faq Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['faq'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Faq')
            }
        }
    });
    return {isUpdating,updateFaq};
}