import { Button } from '@mui/material'
import React, {useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const navigate = useNavigate()

   // send cookies with the request
  axios.defaults.withCredentials = true;

  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext)
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

  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();  // prevent default reloading of page
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 t
ext-sm m-50'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify</h1>
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
        <button className='w-full py-3 bg-indigo-300' text-white rounded-full>Verify email</button>
      </form>
    </>
  )
}

export default EmailVerify
