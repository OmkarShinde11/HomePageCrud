import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderBanner as reorderBannerApi } from "../../Service/bannerService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderBanner(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderBanner}=useMutation({
        mutationFn:(data)=>reorderBannerApi(data),
        onSuccess:()=>{
            toast.success('Banner Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['banners'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the banner')
            }
        }
    });
    return {isReorder,reorderBanner};
}