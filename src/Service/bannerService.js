import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getBanners(){
    // let config = {
    //     method: 'get',
    //     url: `${API_URL}/banner`,
    // };
    try{
        // let data=await axios.request(config);
        const { data } = await axiosInstance.get("/banner");
        // console.log(data?.data?.data);
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};

export async function deleteBanner(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/banner/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/banner/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createBanner(bannerData){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/banner/createBanner`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data:bannerData,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.post("/banner/createBanner", bannerData);
        return data
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateBanner(id,bannerData){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/banner/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch(`/banner/${id}`, bannerData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderBanner(payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/banner/reorderBanner`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch("/banner/reorderBanner", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}