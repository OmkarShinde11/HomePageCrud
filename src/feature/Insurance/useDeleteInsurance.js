import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBanner as deleteBannerApi } from "../../Service/bannerService";
import toast from "react-hot-toast";
import { deleteInsurance as deleteInsuranceApi } from "../../Service/insuranceService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteInsurance(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteInsurance}=useMutation({
        mutationFn:(id)=>deleteInsuranceApi(id),
        onSuccess:()=>{
            toast.success('Insurance Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['insurance'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting Insurance')
            }
        }
    });

    return {isDeleting,deleteInsurance};
}