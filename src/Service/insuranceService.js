import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getInsurance(){
    // let config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/v1/insurance',
    // };
    try{
        // let data=await axios.request(config);
        const data = await axiosInstance.get(`${API_URL}/insurance`);
        // console.log(data?.data?.data);
        return data?.data?.data;
    }catch(err){
        console.log(err);
        throw err;
    };
};

export async function deleteInsurance(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/insurance/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const response = await axiosInstance.delete(`${API_URL}/insurance/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function createInsurance(payload){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/insurance/createInsurance`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data,
    // };
    try{
        // const data=await axios.request(config);
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
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/insurance/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const data = await axiosInstance.patch(`${API_URL}/insurance/${id}`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function reorderInsurance(payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/insurance/reorderInsurance`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const data = await axiosInstance.patch(`${API_URL}/insurance/reorderInsurance`, payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}