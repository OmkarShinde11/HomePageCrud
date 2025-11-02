import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAwards } from "../../Service/award.service";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export default function useCreateAward(){
    const queryClient=useQueryClient();
    const handleTokenExpiry=usehandleTokenExpiry();
    const {isCreating,mutate:createAward}=useMutation({
        mutationFn:(data)=>createAwards(data),
        onSuccess:()=>{
            toast.success('Awards Created Successfully');
            queryClient.invalidateQueries({
                queryKey:['award'],
            })
        },
        onError:()=>{
            if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
                handleTokenExpiry();
            }else{
                toast.error('There is Problem while Created Award')
            }
        }
    });
    return {isCreating,createAward};
}