import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBanner as updateBannerApi } from "../../Service/bannerService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateBanner(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateBanner}=useMutation({
        mutationFn:({id,data})=>updateBannerApi(id,data),
        onSuccess:()=>{
            toast.success('Banner Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['banners'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Banner')
            }
        }
    });
    return {isUpdating,updateBanner};
}