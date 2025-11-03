import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getFaqs(){
    try{
        const { data } = await axiosInstance.get("/faqs");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err;
    };
};

export async function deleteFaq(id){
    try{
        const { data } = await axiosInstance.delete(`/faqs/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function createFaq(formData){
    try{
        const { data } = await axiosInstance.post("/faqs/createFaq", formData, {
            maxBodyLength: Infinity,
          });
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
};

export async function updateFaq(id,formData){
    try{
        const { data } = await axiosInstance.patch(`/faqs/${id}`, formData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export async function reorderFaq(payload){
    try{
        const { data } = await axiosInstance.patch("/faqs/reorderFaq", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}