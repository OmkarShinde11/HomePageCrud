import { useQuery } from "@tanstack/react-query";
import getCoreUsp from "../../Service/coreUsp.service";

export default function useCoreUsp(){
    const {isLoading,data:coreUsp}=useQuery({
        queryKey:['coreUsp'],
        queryFn:getCoreUsp,
    });
    return {isLoading,coreUsp};
}