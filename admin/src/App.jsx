import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from './assets/assets.js';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Allappointment from './pages/admin/Allappointment.jsx';
import AddDoctor from './pages/admin/AddDoctor.jsx';
import DoctorList from './pages/admin/DoctorList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';

import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import DoctorAppointment from './pages/doctor/DoctorAppointment.jsx'
import DoctorProfile from './pages/doctor/DoctorProfile.jsx'



export default function App() {

  const {adminToken} = useContext(AdminContext)
  const {doctorToken} = useContext(DoctorContext)



  return adminToken || doctorToken ? (
      <div className= 'h-screen bg-slate-300'>
          <Navbar />
          <ToastContainer />
          <div className='flex items-start' >
            <Sidebar />
            <Routes>
              {/* Admin Route */}
              <Route path='/'  element={<></>}/>
              <Route path='/admin-dashboard' element={<Dashboard />}/>
              <Route path='/all-appointments' element={<Allappointment />}/>
              <Route path='/add-doctor' element={<AddDoctor />}/>
              <Route path='/doctor-list' element={<DoctorList />}/>

              {/* Doctor Route */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
              <Route path='/doctor-appointments' element={<DoctorAppointment />}/>
              <Route path='/doctor-profile' element={<DoctorProfile />}/>
            </Routes>
          </div>
      </div>
  ) : (
      <div className= 'h-screen bg-slate-900 px-[10%]'>
          <div className='max-w-screen h-10 bg-slate-300'>
              <img src={assets.admin_logo} alt="Logo"
              className='w-28 cursor-pointer'
              />
          </div>
          <div className='mx-4 sm:mx-[10%]'>
            <Login />
            <ToastContainer />
          </div>
      </div>
  )
}
