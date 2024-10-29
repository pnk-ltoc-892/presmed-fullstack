import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = ({children}) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || '')


    const [appointments, setAppointments] = useState([])
    const fetchDoctorAppointments = async () => {
        try {
            // console.log("Server Call");
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {headers: {dtoken: doctorToken}})
            if(data.success){
                setAppointments(data.appointments)
                // console.log(data.appointments.reverse());
            }
            else{
                toast.error(data.error)
            }
        } catch (error) {
            console.log("Error While Fetching Doctor Appointments: ", error);
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId},{headers: {dtoken: doctorToken}})
            if(data.success){
                toast.success("Appointment Cancelled")
                fetchDoctorAppointments()
            }
            else{
                toast.error(data.error)
            }
        } catch (error) {
            console.log("Error While Cancelling Appointment: ", error);
            toast.error(error)
        }
    }
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId},{headers: {dtoken: doctorToken}})
            if(data.success){
                toast.success("Appointment Completed")
                fetchDoctorAppointments()
            }
            else{
                toast.error(data.error)
            }
        } catch (error) {
            console.log("Error While Cancelling Appointment: ", error);
            toast.error(error.message)
        }
    }

    // ! For Variables that store data, that will be fetched from server, 
    // ! Use 'false' as initial Value, => Conditional Rendering will be easy
    const [dashData, setDashData] = useState(false)
    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {headers: {dtoken: doctorToken}})
            if(data.success){
                setDashData(data.data)
                // console.log(data.data);
            }
            else{
                toast.error(data.error)
            }
        } catch (error) {
            console.log("Error While Fetching Dashboard Data: ", error);
            toast.error(error.error)
        }
    }

    const [profile, setProfile] = useState(false)
    const getDoctorProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/my-profile', {headers: {dtoken: doctorToken}})
            if(data.success){
                setProfile(data.doctor)
                console.log(data.doctor);
            }
            else{
                toast.error(data.error)
            }


        } catch (error) {
            console.log("Error While Fetching Doctor Profile: ", error);
            toast.error(error.message)
        }
    }


    const value = {
        backendUrl,
        doctorToken, 
        setDoctorToken,
        fetchDoctorAppointments,
        appointments,
        fetchDashboardData,
        dashData,
        completeAppointment,
        cancelAppointment,
        profile,
        getDoctorProfile,
        setProfile
    }


    return <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>
}

export default DoctorContextProvider