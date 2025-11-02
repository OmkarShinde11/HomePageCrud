import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBanner as deleteBannerApi } from "../../Service/bannerService";
import toast from "react-hot-toast";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteBanner(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteBanner}=useMutation({
        mutationFn:(id)=>deleteBannerApi(id),
        onSuccess:()=>{
            toast.success('Banner Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['banners'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting Banner')
            }
        }
    });

    return {isDeleting,deleteBanner};
}