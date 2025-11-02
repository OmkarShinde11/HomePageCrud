import { useQuery } from "@tanstack/react-query";
import getBanners from "../../Service/bannerService";

export default function useBanners(){
    const {isLoading,data:bannerData}=useQuery({
        queryKey:['banners'],
        queryFn:getBanners,
    });
    return {isLoading,bannerData};
}