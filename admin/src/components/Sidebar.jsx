import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import SidebarLinks from './SidebarLinks.jsx'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Sidebar = () => {
    const {adminToken, setAdminToken} = useContext(AdminContext)
    const {doctorToken} = useContext(DoctorContext)
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                adminToken && <ul className='text-gray-900 mt-5'>
                                        
                    <SidebarLinks path={'/admin-dashboard'} icon={assets.home_icon} title={'Dashboard'} />

                    <SidebarLinks path={'/all-appointments'} icon={assets.appointment_icon} title={'Appointment'} />

                    <SidebarLinks path={'/add-doctor'} icon={assets.add_icon} title={"Add Doctor"} />

                    <SidebarLinks path={'/doctor-list'} icon={assets.list_icon} title={"Doctor List"} />
                </ul>
            }
            {
                doctorToken && <ul className='text-gray-900 mt-5'>

                    <SidebarLinks path={'/doctor-profile'} icon={assets.add_icon} title={"My Profile"} />
                                        
                    <SidebarLinks path={'/doctor-dashboard'} icon={assets.home_icon} title={'Dashboard'} />

                    <SidebarLinks path={'/doctor-appointments'} icon={assets.appointment_icon} title={'My Appointments'} />
                </ul>
            }
        </div>
    )
}

export default Sidebar