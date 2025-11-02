import { useQuery } from "@tanstack/react-query";
import getExperties from "../../Service/expertiesService";

export default function useExperties(){
    const {isLoading,data:expertiesData}=useQuery({
        queryKey:['experties'],
        queryFn:getExperties,
    });
    return {isLoading,expertiesData};
}