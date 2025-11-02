import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateExperties as updateExpertiesApi } from "../../Service/expertiesService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateExperties(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateExperties}=useMutation({
        mutationFn:({id,data})=>updateExpertiesApi(id,data),
        onSuccess:()=>{
            toast.success('Experties Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['experties'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Experties')
            }
        }
    });
    return {isUpdating,updateExperties};
}