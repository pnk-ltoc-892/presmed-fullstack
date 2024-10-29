import React, { useContext, useState } from 'react'
import {AppContext} from '../context/AppContext.jsx'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MyAppointments() {
    const navigate = useNavigate()
    const { backendUrl, userToken, getAllDoctors } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])

    const months = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + (dateArray[2])
    }

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-user-appointments', {headers: {token: userToken}})
            if(data.success){
                // toast.success(data.message)
                setAppointments(data.data.reverse())
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log("Error While Fetching Appointment: ", error);
            toast.error(error.message)
        }
    }

    const cancelAppointments = async (appointmentId) => {
        try {
            const { data } = await axios.put(backendUrl + '/api/user/cancel-user-appointments',{appointmentId} , {headers: {token: userToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
                getAllDoctors()
                // navigate('/my-appointments')
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log("Error While Cancelling Appointment: ", error);
            toast.error(error.message)
        }
    }

    const makeAppointmentPayement = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payement-appointment',{appointmentId} , {headers: {token: userToken}})
            if(data.success){
                toast.success(data.message)
                verifyAppointmentPayement(appointmentId)
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log("Error While Making Appointment: ", error);
            toast.error(error.message)
        }
    }

    const verifyAppointmentPayement = async (appointmentId) => {
        try {
            const razorPayOrderId = {}
            const { data } = await axios.post(backendUrl + '/api/user/verify-payement',{razorPayOrderId, appointmentId} , {headers: {token: userToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
                navigate('/my-appointments')
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log("Error While Making Appointment: ", error);
            toast.error(error.message)
        }
    }


    useEffect( () => {
        if(userToken){
            getAppointments()
            // console.log(appointments);
        }
        else{
            toast.warn("Login To See Appointments")
            navigate('/login')
        }
    }, [] )

    return (
        <div>
            <p className='p-3 mt-12 font-medium text-zinc-700 border-b text-2xl' >My appointments</p>
            <div>
                {
                    appointments.map( (item, index) => (
                        <div key={index} 
                            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-10 py-4 border-b cursor-pointer justify-between px-4'
                            
                        >
                            <div className='flex flex-1 border border-gray-500 p-2'
                                onClick={() => {navigate(`/appointment/${item.docId}`); scrollTo(0,0);}}
                            >
                                <div>
                                    <img src={item.docData.image} alt="Doctor Image" 
                                        className='w-32 bg-indigo-50 hover:bg-indigo-100'
                                    />
                                </div>
                                <div className='flex-1 text-sm text-zinc-600' > 
                                    <p className=' font-semibold' >{item.docData.name}</p>
                                    <p>{item.speciality}</p>
                                    <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                                    <p className='text-xs'>{item.docData.address.line1}</p>
                                    <p className='text-xs'>{item.docData.address.line2}</p>
                                    <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-end'>
                                <div className='flex flex-col gap-2 justify-end'>
                                    {
                                        // ! Fix This Issue
                                        // ! If Completed Then Remove, Cancelled And PAid Options
                                        (item.cancel && !item.payment && !item.isCompleted) 
                                        ? <button onClick={()=>makeAppointmentPayement(item._id)}
                                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200'>Pay Online</button>
                                        : <button className='text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-green-500 hover:text-white transition-all duration-200'>Paid</button>
                                    }
                                    
                                    {
                                        item.cancel
                                        ? <button
                                        className='text-sm text-red-600 border text-center sm:min-w-48 py-2  rounded border-black'>Cancelled</button>
                                        :
                                        <button onClick={() => cancelAppointments(item._id)}
                                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200'>Cancel Appointment</button>
                                    }
                                    {/* <button onClick={() => cancelAppointments(item._id)}
                                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200'>Cancel Appointment</button> */}
                                </div>
                            </div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}
export default MyAppointments