import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCoreUsp as deleteCoreUspApi } from "../../Service/coreUsp.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteCoreUsp(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteCoreUsp}=useMutation({
        mutationFn:(id)=>deleteCoreUspApi(id),
        onSuccess:()=>{
            toast.success('Core-Usp Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['coreUsp'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting Core-Usp')
            }
        }
    });

    return {isDeleting,deleteCoreUsp};
}