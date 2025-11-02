import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBanner as createBannerApi } from "../../Service/bannerService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useCreateBanner(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isCreating,mutate:createBanner}=useMutation({
        mutationFn:(data)=>createBannerApi(data),
        onSuccess:()=>{
            toast.success('Banner Created Successfully');
            queryClient.invalidateQueries({
                queryKey:['banners'],
            })
        },
        onError:(err)=>{
            // console.log('createError',err?.response?.data?.message);
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Created Banner')
            }
        }
    });
    return {isCreating,createBanner};
}