import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateKeyDifferenciators as apiCall } from "../../Service/keyDifferenciators.Service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useUpdateKeyDifferenciators(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isUpdating,mutate:updateDifferenciators}=useMutation({
        mutationFn:({id,data})=>apiCall(id,data),
        onSuccess:()=>{
            toast.success('Differenciators Updated Successfully');
            queryClient.invalidateQueries({
                queryKey:['keyDifferenciators'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Updating Differenciators')
            }
        }
    });
    return {isUpdating,updateDifferenciators};
}