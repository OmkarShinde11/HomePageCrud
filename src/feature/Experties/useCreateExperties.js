import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExperties as apiCall } from "../../Service/expertiesService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useCreateExperties(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isCreating,mutate:createExperties}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('Experties Created Successfully');
            queryClient.invalidateQueries({
                queryKey:['experties'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Created Experties')
            }
        }
    });
    return {isCreating,createExperties};
}