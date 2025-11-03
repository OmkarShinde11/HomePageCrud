import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getKeyDifferenciators(){
    try{
        const { data } = await axiosInstance.get("/keyDifferentiators");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err;
    };
};

export async function deleteDifferenciators(id){
    try{
        const { data } = await axiosInstance.delete(`/keyDifferentiators/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function createDifferenciators(payload){
    try{
        const { data } = await axiosInstance.post(
            "/keyDifferentiators/createkeyDifferentiators",
            payload
          );
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
};

export async function updateKeyDifferenciators(id,payload){
    try{
        const { data } = await axiosInstance.patch(
            `/keyDifferentiators/${id}`,
            payload
        );
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function reorderKeyDifferenciators(payload){
    try{
        const { data } = await axiosInstance.patch(
            "/keyDifferentiators/reorderKeyDifferentiators",
            payload
        );
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}