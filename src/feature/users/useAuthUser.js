import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../../Service/userService";
import { redirect } from "react-router-dom";

export function useAuthUser() {
  const {isLoading,data:authUser,isError}=useQuery({
    queryFn: getAuthUser,
    queryKey: ["authUser"],
    retry: false,
    onError:(err)=>{
        console.log(err?.response?.data?.error?.name);
        if(err?.response?.data?.error?.name==='TokenExpiredError'){
           localStorage.removeItem('token');
        }
    }
  });

  return {isLoading,authUser,isError}
}
