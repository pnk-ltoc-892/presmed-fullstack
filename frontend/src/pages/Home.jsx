import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

function Home() {
    return (
        <>
            <div className='border-b-[1px] border-black '>
                <Header />
            </div>
            <div className='border-b-[1px] border-black '>
                <SpecialityMenu />
            </div>
            <div className='border-b-[1px] border-black '>
                <TopDoctors />
            </div>
            <div className='border-b-[1px] border-black '>
                <Banner />
            </div>
        </>
    )
}

export default Home