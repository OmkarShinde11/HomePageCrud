import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin, signUp as signUpApi  } from "../../Service/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usehandleTokenExpiry from "../../hooks/handleTokenExpiry";

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  const handleTokenExpiry=usehandleTokenExpiry();
  const navigate=useNavigate();
  const {isCreating,mutate:adminCreate}=useMutation({
    mutationFn:createAdmin,
    onSuccess:(data, variables, context) => {
      toast.success('New Admin User Create Successfully. Kindly Login to check');
      if (context?.onSuccess) {
        context.onSuccess(data);
      }
    },
    onError:(err)=>{
        if(err?.response?.data?.error?.name==='TokenExpiredError' || err?.response?.data?.error?.name==='JsonWebTokenError' || err?.response?.data?.message===`You're not login please login then try`){
            handleTokenExpiry();
        }else{
            toast.error(err?.response?.data?.message || 'There is problem while creating the new admin users');
        }
    }
  });

  return {isCreating,adminCreate};
}
