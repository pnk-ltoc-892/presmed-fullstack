import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
    return (
        <div>
            <div>
                <p className='text-center text-2xl pt-10 text-gray-600'>CONTACT <span className='text-gray-800 font-medium'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row justify-center gap-20 px-12'>
                <img src={assets.contact_image} alt="" 
                    className='w-full md:w-1/3'
                />
                <div className='flex flex-col py-8 gap-6 md:w-1/2 text-sm text-gray-600'>
                    <b className='text-gray-800'>OUR OFFICE</b>
                    <div>
                        <p>54709 Willms Station</p>
                        <p>Sulte 350, Washington, USA</p>
                    </div>
                    <div>
                        <p>Tel: (415) 555-0312</p>
                        <p>Email: pnkl@bs.in</p>
                    </div>
                    
                    <b className='text-gray-800'>CAREERS AT PRESMED</b>
                    <p>Learn more about our teams and job openings</p>
                    <button className='border w-1/4 border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>saasdasd</button>
                </div>
            </div>
        </div>
    )
}

export default Contact