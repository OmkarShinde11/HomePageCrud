import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reorderAward as reorderApi } from "../../Service/award.service";
import { useNavigate } from "react-router-dom";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useReorderAward(){
    const navigate = useNavigate();
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isReorder,mutate:reorderAward}=useMutation({
        mutationFn:(data)=>reorderApi(data),
        onSuccess:()=>{
            toast.success('Awards Reorder Successfully');
            queryClient.invalidateQueries({
                queryKey:['award'],
            })
        },
        onError:(err)=>{
            console.log(err?.response?.data?.error?.name);
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is problem while reordering the awards')
            }
        }
    });
    return {isReorder,reorderAward};
}