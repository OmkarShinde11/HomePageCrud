import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getExperties(){
    // let config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/v1/experties',
    // };
    try{
        // let data=await axios.request(config);
        const { data } = await axiosInstance.get("/experties");
        // console.log(data?.data?.data);
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};
export async function deleteExperties(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/experties/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/experties/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createExperties(payload){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/experties/createExperties`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.post("/experties/createExperties", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateExperties(id,payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/experties/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch(`/experties/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderExperties(payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/experties/reorderExperties`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch("/experties/reorderExperties", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}