import axios from "axios";
import API_URL from "../utils/apiUrl";
import axiosInstance from "../utils/axiosInterCeptor";
export default  async function getKeyDifferenciators(){
    // let config = {
    //     method: 'get',
    //     url: `${API_URL}/keyDifferentiators`,
    // };
    try{
        // let data=await axios.request(config);
        const { data } = await axiosInstance.get("/keyDifferentiators");
        // console.log(data?.data?.data);
        return data?.data;
    }catch(err){
        console.log(error);
        throw err;
    };
};

export async function deleteDifferenciators(id){
    // let config = {
    //     method: 'delete',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/keyDifferentiators/${id}`,
    // };
    try{
        // const data=await axios.request(config);
        const { data } = await axiosInstance.delete(`/keyDifferentiators/${id}`);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function createDifferenciators(payload){
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/keyDifferentiators/createkeyDifferentiators`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data,
    // };
    try{
        // const data=await axios.request(config);
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
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/keyDifferentiators/${id}`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
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
    // let config = {
    //     method: 'patch',
    //     url: `${API_URL}/keyDifferentiators/reorderKeyDifferentiators`,
    //     // headers: { 
    //     //   'Authorization': '••••••', 
    //     //   ...data.getHeaders()
    //     // },
    //     data : data
    // };
    try{
        // const data=await axios.request(config);
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