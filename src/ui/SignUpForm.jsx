import { Button } from '@mui/material';
import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import { useSignUp } from '../feature/users/useSignUpUser';
import { useCreateAdmin } from '../feature/users/useCreateAdmin';

export default function SignUpForm({adminAccess=false}) {
    const [email,setEmail]=useState(null);
    const [name,setName]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPwd,setConfirmPwd]=useState(null);
    const [type,setType]=useState('password');
    const [confType,setConfType]=useState('password');
    const {isSignUp,signUp}=useSignUp();
    const {isCreating,adminCreate}=useCreateAdmin();

    function handleSubmit(e){
        e.preventDefault();
        if(!email || !name || !password || !confirmPwd){
            return toast.error('Please Fill Form Correctly');
        }
        if(confirmPwd.trim()!==password.trim()){
            return toast.error('Please Enter Confirm Password Correctly');
        };
        adminAccess ? adminCreate({name,email,password,passwordConfirm:confirmPwd,role:'admin'},{
          onSuccess:()=>{
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPwd("");
          }
        }) : signUp({name,email,password,passwordConfirm:confirmPwd})
        
    }

  return (
    <div className="border  w-[50%] mr-auto mx-auto mt-[50px] px-20 py-10 shadow-xl rounded-lg" >
      {
        adminAccess ? (
          <h1 className="text-amber-600 uppercase text-2xl mb-3">Create New Admin</h1>
        ):(
          <h1 className="text-amber-600 uppercase text-2xl mb-3">Create Your Account</h1>
        )
      }
      <form>
      <div className="mb-5">
          <label className="text-sm font-semibold text-amber-600">Your Name</label>
          <input className="w-full bg-slate-100 px-3 py-3 rounded-lg" type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
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
        <div className="mb-5">
          <label className="text-sm font-semibold text-amber-600">Confirm password</label>
          <div className="relative">
            <input className="w-full bg-slate-100 px-3 py-3 rounded-lg" type={confType} name='confirmPwd' value={confirmPwd} onChange={(e)=>setConfirmPwd(e.target.value)}/>
            {
              confType ==='password'?
              <VisibilityOffIcon onClick={()=>setConfType('text')} className="absolute top-3 right-5 cursor-pointer" />:<RemoveRedEyeIcon onClick={()=>setConfType('password')} className="absolute top-3 right-5 cursor-pointer"/>
            }
          </div>
        </div>
        <Button onClick={handleSubmit} className='!px-10 !py-2 !bg-amber-300 !rounded-lg !text-gray-500'>Sign Up</Button>
      </form>
    </div>
  )
}
