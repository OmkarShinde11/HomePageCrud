import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderInsurance as apiCall } from "../../Service/insuranceService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderInsurance(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderInsurance}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('Insurance Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['insurance'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the insurance')
            }
        }
    });
    return {isReorder,reorderInsurance};
}