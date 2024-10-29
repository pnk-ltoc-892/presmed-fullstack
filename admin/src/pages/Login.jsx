import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
import { useNavigate } from 'react-router-dom'



function Login() {
    const [state, setState] = useState('Admin')

    const {setAdminToken} = useContext(AdminContext)
    const {backendUrl, setDoctorToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if(state === 'Admin'){
                const { data } = await axios.post(backendUrl + '/api/admin/login', {email, password: String(password)})
                // console.log(data);
                if(data.success){
                    // console.log(data.token);
                    localStorage.setItem('adminToken', data.token)
                    setAdminToken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const { data } = await axios.post(backendUrl + '/api/doctor/login', {email, password})
                if(data.success){
                    console.log(data.token);
                    localStorage.setItem('doctorToken', data.token)
                    setDoctorToken(data.token)
                    toast.success("Doctor Login Success")
                    navigate('/doctor-profile')
                }
                else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log("Error While Logging In: ", error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg' >
                <p className='text-2xl font-semibold mx-auto'><span className='text-primary'>{state}</span> Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit' className='bg-primary text-white w-full my-4 py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                
                {
                    state === 'Admin' ? <p>Doctor Login?<span className='text-primary underline cursor-pointer ml-2' onClick={() => setState('Doctor')}>Click Here</span></p> : <p>Admin Login?<span className='text-primary underline cursor-pointer ml-2' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login