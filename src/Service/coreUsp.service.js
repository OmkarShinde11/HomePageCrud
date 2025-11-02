import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";

export default  async function getCoreUsp(){
    // let config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/v1/coreUsp',
    // };
    try{
        // let data=await axios.request(config);
        // console.log(data?.data?.data);
        const { data } = await axiosInstance.get("/coreUsp");
        return data?.data;
    }catch(err){
        console.log(error);
        throw err
    };
};

export async function deleteCoreUsp(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/coreUsp/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/coreUsp/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createCoreUsp(payload){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/coreUsp/createCoreUsp`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.post("/coreUsp/createCoreUsp", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
};

export async function updateCoreUsp(id,payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/coreUsp/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch(`/coreUsp/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function reorderCoreUsp(payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/coreUsp/reorderCoreUsp`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch("/coreUsp/reorderCoreUsp", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}