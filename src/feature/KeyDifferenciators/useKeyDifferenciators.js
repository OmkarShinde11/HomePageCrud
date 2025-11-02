import { useQuery } from "@tanstack/react-query";
import getKeyDifferenciators from "../../Service/keyDifferenciators.Service";

export default function useKeyDifferenciators(){
    const {isLoading,data:differenciators}=useQuery({
        queryKey:['keyDifferenciators'],
        queryFn:getKeyDifferenciators,
    });
    return {isLoading,differenciators};
}