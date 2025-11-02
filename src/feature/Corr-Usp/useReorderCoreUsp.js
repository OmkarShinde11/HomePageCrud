import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderCoreUsp as apiCall } from "../../Service/coreUsp.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderCoreUsp(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderCoreUsp}=useMutation({
        mutationFn:(data)=>apiCall(data),
        onSuccess:()=>{
            toast.success('CoreUsp Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['coreUsp'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the coreUsp')
            }
        }
    });
    return {isReorder,reorderCoreUsp};
}