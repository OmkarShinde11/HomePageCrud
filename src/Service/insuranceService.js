import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getInsurance(){
    try{
        const data = await axiosInstance.get(`${API_URL}/insurance`);
        return data?.data?.data;
    }catch(err){
        console.log(err);
        throw err;
    };
};

export async function deleteInsurance(id){
    try{
        const response = await axiosInstance.delete(`${API_URL}/insurance/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createInsurance(payload){
    try{
        const data = await axiosInstance.post(`${API_URL}/insurance/createInsurance`, payload, {
            maxBodyLength: Infinity,
        });
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateInsurance(id,payload){
    try{
        const data = await axiosInstance.patch(`${API_URL}/insurance/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function reorderInsurance(payload){
    try{
        const data = await axiosInstance.patch(`${API_URL}/insurance/reorderInsurance`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}