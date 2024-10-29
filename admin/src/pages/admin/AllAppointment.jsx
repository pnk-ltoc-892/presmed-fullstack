import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { AppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'

const Allappointment = () => {
    const { backendUrl, adminToken, appointments, getAppointmentList } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId} , {headers: {token: adminToken}})
            if(data.success){
                toast.success(data.message)
                getAppointmentList()
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


    useEffect(() => {
        if(adminToken){
            getAppointmentList()
            console.log(appointments);
        }
    }, [adminToken])
    

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium' >All Appointments</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col border-b py-3 px-6'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {
                    appointments.map( (item, index) => (
                        <div key={index}
                            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'
                        >
                            <p className='max-sm:hidden' >{index + 1}</p>
                            <div className='flex items-center gap-2' >
                                <img className='w-8 rounded-full'
                                    src={item.userData.image} alt="" />
                                <p>{item.userData.name}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                            <p className='max-sm:hidden'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                            <div className='flex items-center gap-2' >
                                <img className='w-8 rounded-full bg-primary'
                                    src={item.docData.image} alt="" />
                                <p>{item.docData.name}</p>
                            </div>
                            <p>{currencySymbol} {item.amount}</p>
                            {
                                item.cancel
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                :
                                    item.isCompleted
                                    ?
                                    <p className='text-green-600 text-xs font-medium' >Completed</p>
                                    :
                                    <img className='w-10 cursor-pointer'
                                    src={assets.cancel_icon} alt="" 
                                    onClick={() => cancelAppointment(item._id)}
                                    />
                            }
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default Allappointment