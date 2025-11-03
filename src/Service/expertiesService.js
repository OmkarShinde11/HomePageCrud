import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getExperties(){
    try{
        const { data } = await axiosInstance.get("/experties");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};
export async function deleteExperties(id){
    try{
        const { data } = await axiosInstance.delete(`/experties/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createExperties(payload){
    try{
        const { data } = await axiosInstance.post("/experties/createExperties", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateExperties(id,payload){
    try{
        const { data } = await axiosInstance.patch(`/experties/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderExperties(payload){
    try{
        const { data } = await axiosInstance.patch("/experties/reorderExperties", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}