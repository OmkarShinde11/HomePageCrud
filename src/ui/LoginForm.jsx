import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import { useLogin } from '../feature/users/useLoginUser';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [type,setType]=useState('password');
    const {isLogIn,login}=useLogin();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const navigate=useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(!email && !password){
            toast.error('Please Fill Form Correctly');
            return;
        };

        if(!emailRegex.test(email)){
          return toast.error('Please Enter email in correct format');
        }
        if(password.length < 8){
          return toast.error('Password requires minimum 8 characters');
        }
        login({email,password});
    }

    if(isLogIn){
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress/>
            </div>
        )
    }

  return (
    <div className="border  w-[50%] mr-auto mx-auto mt-[90px] px-20 py-10 shadow-xl rounded-lg" >
      <h1 className="text-amber-600 uppercase text-2xl mb-3">Log In To Your Account</h1>
      <form>
        <div className="mb-5">
          <label className="text-sm font-semibold text-amber-600">Email address</label>
          <input className="w-full bg-slate-100 px-3 py-3 rounded-lg" type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label className="text-sm font-semibold text-amber-600">Password</label>
          <div className="relative">
          <input className="w-full bg-slate-100 px-3 py-3 rounded-lg" type={type} name='pasword' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {
              type ==='password'?
              <VisibilityOffIcon onClick={()=>setType('text')} className="absolute top-3 right-5 cursor-pointer" />:<RemoveRedEyeIcon onClick={()=>setType('password')} className="absolute top-3 right-5 cursor-pointer"/>
          }
          </div>
        </div>
        <div className="space-x-4">
        <Button onClick={handleSubmit} className='!px-10 !py-2 !bg-amber-300 !rounded-lg !text-gray-500'>Login</Button><span>OR</span>
        <Button onClick={()=>navigate('/signUp')} className='!px-10 !py-2 !bg-amber-300 !rounded-lg !text-gray-500'>Create Account</Button>
        </div>
      </form>
    </div>
  )
}
