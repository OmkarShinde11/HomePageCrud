import { useQuery } from "@tanstack/react-query";
import getAwards from "../../Service/award.service";

export default function useAward(){
    const {isLoading,data:awardData}=useQuery({
        queryKey:['award'],
        queryFn:getAwards,
    });
    return {isLoading,awardData};
}