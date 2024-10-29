import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets.js';
import { AdminContext } from '../../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddDoctor = () => {
    const [docImage, setDocImage] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('')
    const [fee, setFee] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [education, setEducation] = useState('')
    const [addLine1, setAddLine1] = useState('')
    const [addLine2, setAddLine2] = useState('')
    const [about, setAbout] = useState('')
    
    const {adminToken, backendUrl} = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if(!docImage){
                return toast.error("Image Not Selected")
            }

            const formData = new FormData()
            formData.append('image', docImage);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('degree', education);
            formData.append('experience', experience);
            formData.append('about', about);
            formData.append('fee', Number(fee));
            formData.append('speciality', speciality);
            formData.append('available', 'true');
            formData.append('address', JSON.stringify({line1: addLine1, line2: addLine2}));
            
            // formData.forEach(element => {
            //     console.log(element);
            // });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{
                token: adminToken
            }})

            if(data.success){
                toast.success(data.message)
                setDocImage(false)
                setName('')
                setEmail('')
                setPassword('')
                setAddLine1('')
                setAddLine2('')
                setExperience('')
                setEducation('')
                setAbout('')
                setFee('')
                setSpeciality('General physician')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log("Error While Making Add Doctor Post Request: Error - ", error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler}
            className='m-5 mt-2 w-full'
        >
            <p className='mb-3 font-medium'>Add Doctor</p>
            <div className='bg-gray-100 p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                {/* Uploading The Image */}
                <div className='flex items-center gap-4 mb-6 text-gray-700'>
                    <label htmlFor='doc-img' className='bg-slate-200 rounded-full p-2'>  
                        <img src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer border-indigo-700'/>
                    </label>
                    <input type="file" id='doc-img' hidden
                            onChange={(e) => setDocImage(e.target.files[0])}
                    />
                    <p>Upload doctor <br /> picture</p>
                </div>

                {/* Rest Form Data */}
                <div className='flex flex-col lg:flex-row items-start gap-12 text-gray-800'> 
                    <div className='w-full lg:flex-1 flex flex-col gap-4' >
                        <div>
                            <p>Doctor Name: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <p>Doctor Email: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <p>Doctor Password: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <p>Experience (In Years): </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="number" value={experience} placeholder='Experience' onChange={(e) => setExperience(e.target.value)} required />
                        </div>
                        <div>
                            <p>Fee: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="number" value={fee} placeholder='Fee' onChange={(e) => setFee(e.target.value)} required />
                        </div>
                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div>
                            <p>Speciality: </p>
                            <select className='border border-zinc-300 rounded w-full p-2 mt-1'
                            value={speciality}
                            onChange={(e) => {console.log(speciality);setSpeciality(e.target.value);}
                            } required >
                                <option value="General physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div>
                            <p>Education: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text" value={education} placeholder='Education' onChange={(e) => setEducation(e.target.value)} required />
                        </div>
                        <div>
                            <p>Address: </p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text" value={addLine1} placeholder='Address 1' onChange={(e) => setAddLine1(e.target.value)} required />
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text" value={addLine2} placeholder='Address 2' onChange={(e) => setAddLine2(e.target.value)} required />
                            
                        </div>
                    </div>
                    
                </div>
                <div>
                        <p>About: </p>
                        <textarea rows={4}
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="text" value={about} placeholder='About' onChange={(e) => setAbout(e.target.value)} required />
                </div>
                <button type='submit' className='bg-primary text-white text-sm mt-4 px-8 py-2 rounded-full'
                >Add Doctor</button>
            </div>
        </form>
    )
}

export default AddDoctor