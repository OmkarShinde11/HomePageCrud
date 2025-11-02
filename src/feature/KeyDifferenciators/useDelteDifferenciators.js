import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDifferenciators as apiCall } from "../../Service/keyDifferenciators.Service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteDifferenciators(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteDifferenciators}=useMutation({
        mutationFn:(id)=>apiCall(id),
        onSuccess:()=>{
            toast.success('Differenciaotrs Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['keyDifferenciators'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting Differenciators')
            }
        }
    });

    return {isDeleting,deleteDifferenciators};
}