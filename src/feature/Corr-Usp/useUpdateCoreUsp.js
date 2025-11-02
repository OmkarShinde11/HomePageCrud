import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCoreUsp as updateCoreUspApiCall } from "../../Service/coreUsp.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateCoreUsp(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateCoreUsp}=useMutation({
        mutationFn:({id,data})=>updateCoreUspApiCall(id,data),
        onSuccess:()=>{
            toast.success('Core-Usp Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['coreUsp'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Core-Usp')
            }
        }
    });
    return {isUpdating,updateCoreUsp};
}