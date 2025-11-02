import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateInsurance as updateInsuranceApi } from "../../Service/insuranceService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateInsurance(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateInsurance}=useMutation({
        mutationFn:({id,data})=>updateInsuranceApi(id,data),
        onSuccess:()=>{
            toast.success('Insurance Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['insurance'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Insurance')
            }
        }
    });
    return {isUpdating,updateInsurance};
}