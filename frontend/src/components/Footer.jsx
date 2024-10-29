import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-12 text-sm'>
                {/* Left Section */}
                <div>
                    <img src={assets.logo} alt="Logo"  
                        className='mb-5 w-40'
                    />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit velit voluptatem nostrum fugiat exercitationem nihil maiores rem laboriosam. Odit nobis fugit sim obcaecati, cumque voluptatum? Rem harum amet odit.
                    </p>
                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-4'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-4'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1 234 5678 9</li>
                        <li>pnkl@bs.co.in</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright © 2024 pnkl@bs - All Right Reserved.</p>
            </div>
        </div>
    )
}
