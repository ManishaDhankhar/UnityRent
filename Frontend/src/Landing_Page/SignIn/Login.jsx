import React from 'react'
import { User, LogIn, Mail, LockKeyhole } from 'lucide-react';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext);

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();

      // send cookies with the request
      axios.defaults.withCredentials = true;

      if(state === 'Sign Up'){
        // storing post request data
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password});

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message);
        }

      }else{  // state === 'Login'
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password});

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(error.message);
        }
      }
    }catch(error){
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 
    bg-linear-to-br from-blue-200 to-blue-600'>

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-110
      text-indigo-400 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>

        <p className='text-center text-shadow-xs mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

        <form onSubmit={onSubmitHandler}>

          {state === 'Sign Up' && (
            <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5
          bg-[#333A5C] text-white rounded-xl'>
            <User size={20} className="text-gray-500" />
            <input 
             onChange={e => setName(e.target.value)}
             value={name}
             className='bg-transparent outline-none' type='text' 
             placeholder='Full Name' required></input>
          </div>
        )}
          

          <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5
           rounded-xl bg-[#333A5C] text-white'>
            <Mail size={20} className="text-gray-500" />
            <input 
             onChange={e => setEmail(e.target.value)}
             value={email}
             className='bg-transparent outline-none' type='text' placeholder='Emai id' required></input>
          </div>

          <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5
          bg-[#333A5C] text-white rounded-xl'>
            <LockKeyhole size={20} className="text-gray-500" />
            <input
             onChange={e => setPassword(e.target.value)}
             value={password}
             className='bg-transparent outline-none' type='password' placeholder='Password' required></input>
          </div>

          <p onClick={()=> navigate("/reset-password")}
          className='mb-4 text-indigo-400 cursor-pointer'>Forgot password?</p>

          <button className='w-full py-2.5 rounded-full bg-linear-to-r 
          from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
          
          {state === 'Sign Up' ? (
            <p className='mt-4 text-gray-400'>Already have an account?{' '}
            <span onClick={()=> setState('Login')} className='text-blue-400 cursor-pointer underline'>Login Here</span>
          </p>
        ) : 
        ( <p className='mt-4 text-gray-400'>Don't have an account?{' '}
            <span onClick={()=> setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Signup</span>
          </p>
        )}          
          
        </form>
      </div>
      
    </div>
    
  )
}

export default Login
