import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { toast, useToast } from 'react-toastify'
import { assets } from '../assets/assets.js'
import axios from 'axios'

function MyProfile() {
    const [isEdit, setIsEdit] = useState(false)

    const { userData, setUserData, getUserProfile, userToken, backendUrl } = useContext(AppContext)

    const [image, setImage] = useState(false)

    const updateUserProfileData = async () => {        
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            
            image && formData.append('image', image)
            
            const { data } = await axios.post(backendUrl + '/api/user/update-user-profile', formData, {headers:{token: userToken}})
            if(data.success){
                toast.success(data.message)
                await getUserProfile() // Refetch Data
                setIsEdit(true)
                setImage(false)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log("Error While Updating User Data: ", error);
            toast.error(error.message)
        }
    }
    return (
        userData && <div className='max-w-lg flex flex-col gap-4 text-sm'>
            {
                <div className='flex gap-5'>
                    {
                        !isEdit ? <img src={userData.image} alt="dsaas" className='w-36 rounded ml-4'/>
                        
                        // ! VERY IMPORTANT LOGIC
                        // Clicking Label (Which Is Anything Inside) Will Access Input Field,
                        : <label htmlFor="imageInput">
                            <div className='inline-block relative cursor-pointer'>
                                <img className='w-36 rounded opacity-75'
                                    src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12'
                                    src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input type="file" id='imageInput' hidden 
                            onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    }
                </div>
            }
            <div>
                <div>
                    <input 
                            type="text" 
                            className={`text-gray-900 text-2xl font-medium px-4 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                            disabled={!isEdit} // ! Important Property
                            value={userData.name} 
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            />
                </div>
                <hr className='bg-zinc-400 h-[1px] border-none m-1' />
                <div>
                    <p className='text-neutral-500 underline mt-3 pl-2'>CONTACT INFORMATION</p>
                    
                    <div className='pt-2'>
                        <label className="w-1/4 inline-block m-2 text-sm md:text-lg font-medium text-gray-900">Email:</label>
                        <input  type="text" 
                                className={`text-primary text-sm md:text-lg px-4 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                                disabled={!isEdit}
                                value={userData.email} 
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                />      
                    </div>
                    <div className='pt-2'>
                        <label className="w-1/4 inline-block m-2 text-sm md:text-lg font-medium text-gray-900 ">Phone:</label>
                        <input  type="text" 
                                className={`text-primary text-sm md:text-lg px-4 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                                disabled={!isEdit}
                                value={userData.phone} 
                                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                />      
                    </div>
                    <div className='flex pt-2'>
                        <label className="w-1/4 inline-block m-2 text-sm md:text-lg font-medium text-gray-900 ">Address:</label>
                        <div className='flex flex-col'>
                        <input  type="text" 
                                className={`text-gray-700 text-sm md:text-lg px-4 py-1 mt-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                                disabled={!isEdit}
                                value={userData.address.line1 || ""} 
                                onChange={(e) => setUserData({...userData, address: {...userData.address, line1: e.target.value}})}
                                />
                        <input  type="text" 
                                className={`text-gray-700 text-sm md:text-lg px-4 mt-1 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                                disabled={!isEdit}
                                value={userData.address.line2 || ""} 
                                onChange={(e) => setUserData({...userData, address: {...userData.address, line2: e.target.value}})}
                                />  
                        </div>    
                    </div>

                    <p className='text-neutral-500 underline mt-3 pl-2'>BASIC INFORMATION</p>
                    <div  className='pt-2'>
                        <label className="w-1/4 inline-block m-2 text-sm md:text-lg font-medium text-gray-900 ">Gender: </label>
                        <select 
                            className={`text-gray-700 text-sm md:text-lg px-4 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`}
                            onChange={(e) => {setUserData({...userData, gender: e.target.value});console.log(e.target.value);
                            }}
                            value={userData.gender}
                            disabled={!isEdit}
                            >
                            <option value="Male" className='text-gray-700 text-sm md:text-lg' >Male</option>
                            <option value="Female" className='text-gray-700 text-sm md:text-lg' >Female</option>
                        </select>
                    </div>
                    <div  className='pt-2'>
                        <label className="w-1/4 inline-block m-2 text-sm md:text-lg font-medium text-gray-900 ">D.O.B: </label>
                        <input  type="date" 
                                className={`text-gray-700 text-sm md:text-lg px-4 py-1 ${isEdit === true ? 'bg-gray-100 border border-gray-400 rounded-lg' : ''}`} 
                                disabled={!isEdit} 
                                value={userData.dob} 
                                onChange={(e) => {setUserData({...userData, dob: e.target.value});
                                }}
                                />      
                    </div>
                    
                    <div className='flex gap-4 mx-4 my-6'>
                        {
                            !isEdit
                            ? <button onClick={() => setIsEdit(true)} className='border border-primary rounded-3xl px-6 py-2 hover:bg-primary hover:text-white transition-all duration-300'>Edit</button>
                            : <button   onClick={updateUserProfileData}
                                        className='border border-primary rounded-3xl px-6 py-2 hover:bg-primary hover:text-white transition-all duration-300'>Save Information</button>
                        }                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile