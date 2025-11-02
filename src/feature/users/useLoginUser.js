import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApiCall } from "../../Service/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const {isLogIn,mutate:login}=useMutation({
    mutationFn:loginApiCall,
    onSuccess: (data) => {
      // Store the user in React Query cache
      queryClient.setQueryData(["authUser"], data?.data.user);
      // Optionally, store the token in localStorage
      localStorage.setItem("token", data?.data?.token);
      toast.success('User login Successfully');
      navigate('/home')
    },
    onError:()=>{
        toast.error('Error while log-in the user');
    }
  });

  return {isLogIn,login};
}
