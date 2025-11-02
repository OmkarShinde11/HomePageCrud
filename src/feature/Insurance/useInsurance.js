import { useQuery } from "@tanstack/react-query";
import getInsurance from "../../Service/insuranceService";

export default function useInsurance(){
    const {isLoading,data:insuranceData}=useQuery({
        queryKey:['insurance'],
        queryFn:getInsurance,
    });
    return {isLoading,insuranceData};
}