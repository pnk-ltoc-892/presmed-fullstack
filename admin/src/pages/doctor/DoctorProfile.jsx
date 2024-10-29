import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx'
import { AppContext } from '../../context/AppContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

// If Address Updated Directly, Getting error???

const DoctorProfile = () => {
    const { backendUrl, doctorToken, profile, getDoctorProfile, setProfile } = useContext(DoctorContext)

    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profile.address,
                fee: profile.fee,
                available: profile.available
            }
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dtoken: doctorToken}})
            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
                getDoctorProfile()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log("Error While Updating Profile: ", error);
            toast.error(error.message)
        }
    }
    

    useEffect(() => {
        if(doctorToken){
            getDoctorProfile()
        }
    }, [])
    
    return profile && (
        <div>
            <div className='flex flex-col gap-4 m-5' >
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profile.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 p-8 py-7 bg-white rounded-lg'>
                    {/* // Name, degree, Exp */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-800'>{profile.name}</p>
                    <div className='flex items-center text-xl gap-2 mt-1 text-gray-800'>
                        <p>{profile.degree} - {profile.speciality} </p>
                        <button className='py-0.5 px-2 border rounded-full text-md '>{profile.experience} Years</button>
                    </div>

                    {/* // Doctor about text */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
                        <p className='max-w-[800px] text-sm font-medium text-neutral-800 mt-1'>{profile.about}</p>
                    </div>

                    <p 
                        className='text-sm font-medium text-neutral-800 mt-4'
                        >Appointment Fee: {" "}
                            <span className='text-gray-800'>$ {" "}
                                {isEdit 
                                    ? 
                                    <input  type="number" 
                                            value={profile.fee}
                                            onChange={(e) => setProfile(prev => ({...prev, fee: e.target.value}))} /> 
                                    : 
                                    profile.fee}</span></p>

                    <div className='flex gap-2 py-2'>
                        <p>Address: </p>
                        <p className='text-sm'>
                            {isEdit ? <input type="text" 
                                        value={profile.address.line1}
                                        onChange={(e) => setProfile(prev => setProfile({...prev, address: {...prev.address, line1: e.target.value}}))} /> : profile.address.line1
                            }                            
                            <br />
                            {isEdit ? <input type="text" 
                                        value={profile.address.line2}
                                        onChange={(e) => setProfile(prev => setProfile({...prev, address: {...prev.address, line2: e.target.value}}))} /> : profile.address.line2
                            }
                        </p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input  type="checkbox" checked={profile.available} 
                                onChange={() => isEdit && setProfile(prev => ({...prev, available: !prev.available}))}/>
                        <label>Available</label>
                    </div>

                    {
                        isEdit
                        ?
                        <button onClick={updateProfile}
                            className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                        :
                        <button onClick={() => setIsEdit(true)}
                            className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile