import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'
import { DoctorContext } from '../context/DoctorContext.jsx'

function Navbar() {
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

    const {adminToken, setAdminToken} = useContext(AdminContext)
    const {doctorToken, setDoctorToken} = useContext(DoctorContext)

    return (
        <div className='bg-slate-100 flex items-center justify-between px-4 sm:px-10 py-3  border-b border-b-gray-400'>
            <div className='flex items-center gap-4 text-sm'>
                <img src={assets.admin_logo} alt="Logo"
                className='w-36 sm:w-40 cursor-pointer'
                />
                <p className='border px-3 py-1 rounded-full border-gray-800 text-gray-700' >{adminToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button className='bg-primary text-white text-sm px-10 py-2 rounded-full'
                    onClick={() => {
                        adminToken && setAdminToken('')
                        adminToken && localStorage.removeItem('adminToken')
                        doctorToken && setDoctorToken('')
                        doctorToken && localStorage.removeItem('doctorToken')
                        navigate('/')
                        // window.location.reload()
                    }}
            >LogOut</button>
        </div>
    )
}

export default Navbar