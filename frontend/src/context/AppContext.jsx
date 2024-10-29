import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = ({children}) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currencySymbol = '$'

    const [doctors, setDoctors] = useState([])
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
                // toast.success("Doctor Data Fetched")
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Fetching Doctors: ", error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getAllDoctors()
    }, [])
    
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') ? localStorage.getItem('userToken') : false)


    // ! User Data
    const [userData, setUserData] = useState(false)
    const getUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-user', {headers:{token: userToken}})
            // console.log(data);
            if(data.success){
                // console.log(data.user);
                setUserData(data.user)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Fetching User: ", error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if(userToken){
            getUserProfile()
        } 
        else{
            setUserData(false)
        }
    }, [userToken])



    // ! Values Passed onto the Context
    
    const value = {
        doctors, getAllDoctors,
        currencySymbol,
        userToken,
        setUserToken,
        backendUrl,

        userData,
        setUserData,
        getUserProfile // Function Can be used in any component
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider