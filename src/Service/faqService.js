import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getFaqs(){
    // let config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/v1/faqs',
    // };
    try{
        // let data=await axios.request(config);
        const { data } = await axiosInstance.get("/faqs");
        // console.log(data?.data?.data);
        return data?.data;
    }catch(err){
        console.log(error);
        throw err;
    };
};

export async function deleteFaq(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/faqs/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/faqs/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function createFaq(formData){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/faqs/createFaq`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data,
    // };
    try{
        // const data=await axios.request(config);
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
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/faqs/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch(`/faqs/${id}`, formData);
        return data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export async function reorderFaq(payload){
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/faqs/reorderFaq`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.patch("/faqs/reorderFaq", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}