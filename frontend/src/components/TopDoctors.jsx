import React, { useContext } from 'react'
// import { doctors } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const TopDoctors = () => {
    // ! Using Doctor Information Directly From Context
    const { doctors } = useContext(AppContext)
    
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-12'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
            Simply browse through our extensive list of trusted doctors
            </p>
            <div className='w-full grid grid-cols-auto gap-4 pt-6 gap-y-6 px-3 sm:px-0' >
                {doctors.slice(0,10).map( (item, index) => (
                    <div key={index} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:scale-105 transition-all duration-300'

                        onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0);}} // ! Redirect To Doctor Page And Scroll To Page TOP
                    >
                        <img src={item.image} alt="Doctor Image" 
                            className='bg-blue-50 hover:bg-blue-100'
                        />
                        <div className='p-4' > 
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ?  "text-green-700" : "text-red-700"} `}>
                                <p className={`w-2 h-2 ${item.available ?  "bg-green-700" : "bg-red-700 text-red-700"} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                            <p className='text-gray-600 text-sm' >{item.speciality}</p>
                        </div>
                    </div>
                ) )}
            </div>
            <button className='bg-blue-100 text-gray-900 px-12 py-3 rounded-full mt-10 hover:bg-blue-200'
                    onClick={() => {
                        navigate('/doctors');
                        scrollTo(0,0)
                    }}
            >Show More</button>
        </div>
    )
}

export default TopDoctors