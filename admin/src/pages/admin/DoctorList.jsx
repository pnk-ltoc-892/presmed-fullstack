import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { useEffect } from 'react'

const DoctorList = () => {
    const {adminToken, doctors, getAllDoctors, changeAvailability} = useContext(AdminContext)

    useEffect( () => {
        if(adminToken){
            getAllDoctors()
        }
    }, [adminToken] )


    return (
        <div className='bg-slate-100 m-8 rounded max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-center text-xl text-gray-800 mt-6'>All Doctors</h1>    

                <div className='w-full flex flex-wrap gap-4 gap-y-6 p-12 justify-center' >
                    {doctors.map( (item, index) => (
                        <div key={index} 
                            className='max-w-56 overflow-hidden border border-blue-200 bg-slate-300 rounded-xl cursor-pointer'
                        >
                            <img src={item.image} alt="Doctor Image" 
                                className='bg-blue-100 hover:bg-primary transition-all duration-300'
                            />
                            <div className='p-4' > 
                                <div className='flex items-center gap-2 text-sm text-center text-gray-700'>
                                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-700' : 'bg-red-700'}` }></p><p>{item.available ? 'Availble' : 'NotAvailble'}</p>
                                    
                                    {/* // ! Change Availability Toggle */}
                                    <div>
                                        <input type="checkbox" checked={item.available} 
                                            onChange={() => {
                                                changeAvailability(item._id, item.available)
                                            }}
                                        />
                                    </div>
                                
                                </div>
                                <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                                <p className='text-gray-600 text-sm' >{item.speciality}</p>
                                
                            </div>
                        </div>
                    ) )}
                </div>
        </div>
    )
}

export default DoctorList