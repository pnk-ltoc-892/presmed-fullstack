import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-primary rounded-lg px-6 py-4 my-20 md:px-16 md:mx-12 '>
            {/* Left Side */}
            <div className='flex-1 py-8 md:py-12 md:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold'>
                <p>Book Appointment</p>
                <p className='mt-4' >With 100+ Trusted Doctors</p>
                <button className='bg-white text-sm sm:text-base text-gray-700 px-8 py-2  rounded-full mt-6 hover:scale-105 transition-all duration-300'
                    onClick={() => {navigate('/login');scrollTo(0,0);}}
                >Create Account</button>
                </div>
            </div>
            {/* Right Side */}
            <div className='hidden md:block md:w-1/2 lg:w-[320px] relative'>
                <img src={assets.appointment_img} alt="Doctor Image" 
                    className='w-full absolute bottom-[-17px] right-0 max-w-sm'
                />
            </div>
        </div>
    )
}

export default Banner