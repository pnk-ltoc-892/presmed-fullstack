import React from 'react'
import { NavLink } from 'react-router-dom'


const SidebarLinks = ({path, icon, title}) => {
    return (
        <NavLink to={path}
                            className={({isActive}) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img src={icon} alt="" />
                        <p className='hidden md:block' >{title}</p>
        </NavLink>
    )
}

export default SidebarLinks