// functionality of login 
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    // to send the cookies so that when a user refresh the page it stores the user information
    // and the user does not logout
    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)

    // fetching user data
    const getUserData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }

    // checking whether user is authenticated or not
    const getAuthState = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    // will check the authentication state whenever we refresh the page
    useEffect(()=>{
        getAuthState();
    }, [])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}