import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderKeyDifferenciators as apiCall } from "../../Service/keyDifferenciators.Service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderDifferenciators(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderKeyDifferenciators}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('keyDifferenciators Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['keyDifferenciators'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the key differenciators')
            }
        }
    });
    return {isReorder,reorderKeyDifferenciators};
}