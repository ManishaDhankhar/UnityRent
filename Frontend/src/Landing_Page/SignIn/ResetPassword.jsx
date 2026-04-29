import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Mail, LockKeyhole } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext);
  // send cookies with the request
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)


  const inputRefs = React.useRef([])
  
    const handleInput = (e, index)=>{
      if(e.target.value.length > 0 && index < inputRefs.current.length -1 ){
        inputRefs.current[index + 1].focus();  // will automatically adjust the cursor to second input field
      }
    }
  
    const handleKeyDown = (e, index) =>{
      if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handlePaste = (e) =>{
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index)=>{
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char;
        }
      })
    }

    const onSubmitEmail = async(e) =>{
      e.preventDefault();
      try{
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
      }catch(error){
        toast.error(error.message)
      }
    }

    const onSubmitOTP = async(e) =>{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      setOtp(otpArray.join(''))
      setIsOtpSubmitted(true)
    }

    const onSubmitNewPassword = async(e) =>{
      e.preventDefault();
      try{
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      }catch(error){
        toast.error(error.message)
      }
    }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 
    bg-linear-to-br from-blue-200 to-blue-600'>

      {/* enter email id */}

      {!isEmailSent && 
         <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm m-50'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
            <p className=' mb-6 text-indigo-300'>Enter your registered email address</p>

            <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5
                rounded-xl bg-[#333A5C] text-white'>
                <Mail size={20} className="text-gray-500" />
                <input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className='bg-transparent outline-none' type='email' placeholder='Emai id' required></input>
            </div>
            <button className='w-full py-2.5 rounded-full bg-linear-to-r 
          from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>
        </form>
      }



      {/* otp input form */}

      {!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitOTP} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 t
          ext-sm m-50'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className=' mb-6 text-indigo-300'>Enter the 6 digit code sent to your email id.</p>

        <div className='flex justify-between mb-8 onPaste={handlePaste}'>
          {Array(6).fill(0).map((_, index)=>(
            <input type='text' maxLength={1} key={index} required 
            className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' ref = {e => inputRefs.current[index] = e}
            onInput = {(e) => handleInput(e, index)}
            onKeyDown = {(e) => handleKeyDown(e, index)}/> 
            // ref = {e => inputRefs.current[index] = e} to store
          ))}
        </div>
        <button className='w-full py-2.5 rounded-full bg-linear-to-r 
          from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>
        </form>
      }


        {/* enter new password */}
        
      {isOtpSubmitted && isEmailSent && 
       <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm m-50'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
            <p className=' mb-6 text-indigo-300'>Enter the new password below</p>

            <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5
                rounded-xl bg-[#333A5C] text-white'>
                <LockKeyhole size={20} className="text-gray-500" />
                <input 
                    onChange={e => setnewPassword(e.target.value)}
                    value={newPassword}
                    className='bg-transparent outline-none' type='password' placeholder='Password' required></input>
            </div>
            <button className='w-full py-2.5 rounded-full bg-linear-to-r 
          from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>
        </form>
      }

        
      </div>
    </>
  )
}

export default ResetPassword
