import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderExperties as apiCall } from "../../Service/expertiesService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderExperties(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderExperties}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('Experties Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['experties'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the experties')
            }
        }
    });
    return {isReorder,reorderExperties};
}