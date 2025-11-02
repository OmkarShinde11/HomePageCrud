import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAward as updateAwardApiCall } from "../../Service/award.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateAward(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateAward}=useMutation({
        mutationFn:({id,data})=>updateAwardApiCall(id,data),
        onSuccess:()=>{
            toast.success('Award Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['banners'],
            })
        },
        onError:()=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Award')
            }
        }
    });
    return {isUpdating,updateAward};
}