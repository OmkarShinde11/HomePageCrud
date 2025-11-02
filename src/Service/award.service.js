import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";

// const token=localStorage.getItem('token');
export default  async function getAwards(){
    // let config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/v1/awards',
    // };
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

    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/awards/${id}`,
    //     headers: { 
    //         'Authorization': `Bearer ${token}`
    //     } 
    // };
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

    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/awards/createAward`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     headers: { 
    //         'Authorization': `Bearer ${token}`
    //     }, 
    //     data,
    // };
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

    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/awards/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     headers: { 
    //         'Authorization': `Bearer ${token}`
    //     },
    //     data : data
    // };
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

    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/awards/reorderAward`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     headers: { 
    //         'Authorization': `Bearer ${token}`
    //     },
    //     data : data
    // };
    try{
        const { data } = await axiosInstance.patch("/awards/reorderAward", payload);
        return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}