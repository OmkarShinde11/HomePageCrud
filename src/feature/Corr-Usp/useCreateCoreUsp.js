import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCoreUsp as createCoreUspApiCall } from "../../Service/coreUsp.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useCreateCoreUsp(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isCreating,mutate:createCoreUsp}=useMutation({
        mutationFn:(data)=>createCoreUspApiCall(data),
        onSuccess:()=>{
            toast.success('Core-Usp Created Successfully');
            queryClient.invalidateQueries({
                queryKey:['coreUsp'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Created Core-Usp')
            }
        }
    });
    return {isCreating,createCoreUsp};
}