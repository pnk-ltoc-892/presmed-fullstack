import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

function Navbar() {
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)

    const {userToken, setUserToken, backendUrl, userData} = useContext(AppContext)

    const logOut = () => {
        setUserToken(false)
        localStorage.removeItem('userToken')
    }

    return (
        <div className='bg-slate-100 flex items-center justify-between text-sm py-4 px-1 border-b border-b-gray-400'>
            <Link to='/'>
                <img src={assets.logo} alt="Logo"
                className='w-28 cursor-pointer'
                />
            </Link>
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='about'>
                    <li className='py-1'>About Us</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>Contact Us</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {
                    userToken && userData && <div className='flex items-center gap-3 cursor-pointer group relative'>
                                    {/* group relative - Help to create drop-down */}
                        <img src={userData.image} alt="Profile" 
                        className='w-8 rounded-full'
                        />
                        <img src={assets.dropdown_icon} alt="Profile" 
                        className='w-2.5'
                        />

                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-3'>
                                <p onClick={() => navigate('/my-profile')}
                                    className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')}
                                    className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={logOut}
                                    className='hover:text-black cursor-pointer'>LogOut</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    !userToken && <button className='bg-primary text-white px-5 py-1 rounded-full font-light hidden md:block'
                    onClick={() => navigate('/login')}>
                    Create Account
                </button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-200`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-8' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-6 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar