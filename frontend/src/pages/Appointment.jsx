import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';


function Appointment() {
    const { doctorid } = useParams()
    const { doctors, currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()

    const [doctor, setDoctor] = useState({})
    const fetchDoctorInfo = () => {
        const docInfo = (doctors.find( doc => doc._id === doctorid ))
        setDoctor(prev => docInfo)
        // console.log(docInfo);
    }
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //             console.log(doctor);
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    // ! State Variables to store Appointment Date
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const getAvailableSlots = () => {
        setDocSlots([])
        // Getting Current Date
        const today = new Date()

        for (let i = 0; i < 7; i++) {
            // Getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // Setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21,0,0,0)

            // Setting hours
            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else{
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []
            // creating 30-min interval slots
            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = String(day) + "_" + String(month) + "_" + String(year)
                
                const slotTime = formattedTime
                
                // const isSlotAvailble = doctor.slotsBooked[slotDate] && doctor.slotsBooked[slotDate]?.includes(slotTime) ? false : true 
                let isSlotAvailble = true
                // Add slot to array if slot available
                if(isSlotAvailble){
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                // Increment current Time by 30 minute
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    useEffect(() => {
        fetchDoctorInfo()
    }, [doctorid, doctors]) // Dependency Not Needed Really ?

    useEffect(() => {
        getAvailableSlots()
        console.log(doctor);
    }, [doctor]) // Dependency Not Needed Really ?

    // useEffect( () => {
    //     console.log(docSlots);
    // }, [docSlots] )


    // ! Book Appointment

    const { backendUrl, userToken, getAllDoctors } = useContext(AppContext)

    const bookAppointment = async () => {
        // console.log(docSlots[slotIndex][0].dateTime.toLocaleDateString());
        // console.log(slotTime);
        if(!userToken){
            toast.warn("Login To Book Appointment")
            return navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].dateTime
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            const slotDate = String(day) + "_" + String(month) + "_" + String(year)
            const appointmentData = {
                docId: doctorid,
                slotDate,
                slotTime: slotTime,
            }
            // console.log(appointmentData);
    
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', appointmentData, {headers: {token: userToken}})
            // console.log(data.data);
            if(data.success){
                toast.success(data.message)
                getAllDoctors() // ! Re-Fetch Doctors Data, With Updated Slots
                navigate('/my-appointments')
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log("Error While Booking Appointment: ", error);
            toast.error(error.message)
        }
    }

    if(!doctor){
        return (
            <h1 className='my-48 text-center'>
                Doctor Not Found
            </h1>
        )
    }
    
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-4 m-12'>
                <div>
                    <img src={doctor.image} alt="" 
                        className='bg-primary w-full sm:max-w-72 rounded-lg'
                    />
                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-6 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {doctor.name}
                        <img src={assets.verified_icon} alt=""
                            className='w-5'
                        />
                    </p>
                    <div className='flex items-center gap-2 text-sm mb-1 text-gray-600'>
                        <p>{doctor.degree} - {doctor.speciality}</p>
                        <button className='py-1 px-2 border text-xs rounded-full'>{doctor.experience} Years</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium mt-3 text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] my-2' >{doctor.about}</p>
                    </div>

                    <p className='text-gray-500 font-medium mt-7'>
                        Appointment Fee: <span className='text-gray-600'>{currencySymbol} {doctor.fee}</span>
                    </p>
                </div>
            </div>
            
            {/* // ! Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700' >
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4' >
                    {
                        docSlots.length && docSlots.map( (item, index) => (
                            <div key={index} 
                                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white': 'border border-gray-400'}` }
                                onClick={() => setSlotIndex(index)}
                            >
                                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                <p>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ) )
                    }
                </div>

                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4' >
                    {
                        docSlots.length && docSlots[slotIndex].map( (item, index) => (
                            
                            // !doctor.slotsBooked[String(docSlots[slotIndex][0].dateTime.getDate()) + "_" + String(docSlots[slotIndex][0].dateTime.getMonth() + 1) + "_" + String(docSlots[slotIndex][0].dateTime.getFullYear())].includes(item.time)
                            
                            // && 
                            <p key={index} 
                                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white': 'border border-gray-400'}` }
                                onClick={() => setSlotTime(item.time)}
                            >
                                {item.time.toLowerCase()}
                            </p>
                        ) )
                    }
                </div>
                <button onClick={bookAppointment}
                    className='bg-primary text-white text-sm font-light px-12 py-3 rounded-full my-8 hover:scale-105 transition-all duration-400'>
                    Book an appointment
                </button>
            </div>

            {/* // Related Doctors */}
            <RelatedDoctors docId={doctorid} speciality={doctor.speciality} />
        </div>
    )
}

export default Appointment