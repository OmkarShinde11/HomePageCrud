import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAward as deleteAwardApi } from "../../Service/award.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useDeleteAward(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isDeleting,mutate:deleteAward}=useMutation({
        mutationFn:(id)=>deleteAwardApi(id),
        onSuccess:()=>{
            toast.success('Award Delete Successfully');
            queryClient.invalidateQueries({
                queryKey:['award'],
            })
        },
        onError:()=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while deleting award')
            }
        }
    });

    return {isDeleting,deleteAward};
}