import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [doctors, setDoctors] = useState([])
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/get-doctors', {headers:{
                token: adminToken
            }})
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Fetching Doctors Login: ", error);
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId, currentStatus) => {
        try {
            const { data } = await axios.patch(backendUrl + '/api/admin/toggle-doctor-availability',{docId, currentStatus}, {headers:{
                token: adminToken
            }})
            if(data.success){
                toast.success(data.message)
                // ! Update Local Data
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Changing Doctor Availability: ", error);
            toast.error(error.message)
        }
    }

    const [appointments, setAppointments] = useState([])
    const getAppointmentList = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', {headers:{
                token: adminToken
            }})
            if(data.success){
                // toast.success(data.message)
                setAppointments(data.appointments)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Fetching Doctor Appointment List: ", error);
            toast.error(error.message)
        }
    }

    const [dashboardData, setDashboardData] = useState({})
    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/get-dashboard-data', {headers:{
                token: adminToken
            }})
            if(data.success){
                setDashboardData(data.data)
                console.log(data.data)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error While Fetching Dashboard Data: ", error);
            toast.error(error.message)
        }
    }


    const value = {
        adminToken, 
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAppointmentList,
        appointments,
        dashboardData,
        getDashboardData
    }


    return (<AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>)
}

export default AdminContextProvider
