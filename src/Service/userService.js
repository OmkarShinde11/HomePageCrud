import axios from "axios";
import API_URL from "../utils/apiUrl";

export async function login(data){
    let config = {
        method: 'post',
        url: `${API_URL}/user/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    try{
        let data=axios.request(config);
        return data;
    }catch(err){
        throw(err);
    }
}

export async function signUp(data){
    let config = {
        method: 'post',
        url: `${API_URL}/user/signUp`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    try{
        let data=await axios.request(config)
        return data;
    }
    catch(err){
        throw(err);
    }
}

export async function getAuthUser(){
    const token=localStorage.getItem('token');
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/user/getAuthUser',
        headers: { 
          'Authorization': `Bearer ${token}`
        }   
    };
    try{
        const data=await axios.request(config);
        return data?.data?.user;

    }catch(err){
        console.log('err',err);
        throw err;
    }
}

export async function createAdmin(data){
    const token=localStorage.getItem('token');
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/user/admin/create-admin',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        data,
    };
    try{
        const data=await axios.request(config);
        return data;

    }catch(err){
        console.log('err',err);
        throw err;
    }
}