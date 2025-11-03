import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";

export default  async function getCoreUsp(){
    try{
        const { data } = await axiosInstance.get("/coreUsp");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};

export async function deleteCoreUsp(id){
    try{
        const { data } = await axiosInstance.delete(`/coreUsp/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createCoreUsp(payload){
    try{
        const { data } = await axiosInstance.post("/coreUsp/createCoreUsp", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateCoreUsp(id,payload){
    try{
        const { data } = await axiosInstance.patch(`/coreUsp/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderCoreUsp(payload){
    try{
        const { data } = await axiosInstance.patch("/coreUsp/reorderCoreUsp", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}