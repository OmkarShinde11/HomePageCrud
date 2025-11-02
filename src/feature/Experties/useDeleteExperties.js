import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteExperties as deleteExpertiesApi } from "../../Service/expertiesService";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteExperties(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteExperties}=useMutation({
        mutationFn:(id)=>deleteExpertiesApi(id),
        onSuccess:()=>{
            toast.success('Experties Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['experties'],
            })
        },
        onError:(err)=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting Experties')
            }
        }
    });

    return {isDeleting,deleteExperties};
}