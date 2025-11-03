import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";

export default  async function getAwards(){
    try{
        let {data}=await axiosInstance.get('/awards');
        console.log('apiData',data?.data);
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};

export async function deleteAward(id){
const token=localStorage.getItem('token');
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/awards/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createAwards(formData){
const token=localStorage.getItem('token');
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.post("/awards/createAward", formData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateAward(id,formData){
const token=localStorage.getItem('token');
    try{
        const { data } = await axiosInstance.patch(`/awards/${id}`, formData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}
export async function reorderAward(payload){
const token=localStorage.getItem('token');
    try{
        const { data } = await axiosInstance.patch("/awards/reorderAward", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}