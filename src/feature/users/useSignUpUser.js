import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi  } from "../../Service/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const {isSignUp,mutate:signUp}=useMutation({
    mutationFn:signUpApi,
    onSuccess: (data) => {
      // Store the user in React Query cache
      queryClient.setQueryData(["authUser"], data?.data?.user);
      // Optionally, store the token in localStorage
      localStorage.setItem("token", data?.data?.token);
      toast.success('User Sign Up Successfully');
      navigate('/home')
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.message || 'Error while sign up the user')
    }
  });

  return {isSignUp,signUp};
}
