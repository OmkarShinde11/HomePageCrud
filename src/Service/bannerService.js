import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getBanners(){
    try{
        const { data } = await axiosInstance.get("/banner");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};

export async function deleteBanner(id){
    try{
        const { data } = await axiosInstance.delete(`/banner/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createBanner(bannerData){
    try{
        const { data } = await axiosInstance.post("/banner/createBanner", bannerData);
        return data
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateBanner(id,bannerData){
    try{
        const { data } = await axiosInstance.patch(`/banner/${id}`, bannerData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderBanner(payload){
    try{
        const { data } = await axiosInstance.patch("/banner/reorderBanner", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}