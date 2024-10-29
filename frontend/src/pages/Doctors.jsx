import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Doctors() {
    const param = useParams()
    const speciality = param.speciality
    // console.log(speciality);

    const { doctors } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)

    const [docFilter, setDocFilter] = useState([])
    const applyFilter = () => {
        if(speciality){
            setDocFilter(doctors.filter(doc => doc.speciality === speciality))
        }
        else{
            setDocFilter(doctors)
        }
    }
    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])
    
    const navigate = useNavigate()

    return (
        <div className='min-h-[60vh]'>
            <p className='text-center text-gray-600 m-8 '>Browse Doctors By Speciality</p>
            <div className='flex flex-col md:flex-row items-start gap-5 mt-5 mx-5'>

// Needs Fix
                <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter === true ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)} >Filters</button>

                <div className={`flex flex-col gap-4 text-sm text-gray-700 `} >
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === undefined ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => navigate('/doctors')}
                    >All</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
                    >General Physician</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
                    >Gynecologist</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
                    >Dermatologist</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
                    >Pediatricians</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
                    >Neurologist</p>
                    <p className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}
                    onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
                    >Gastroenterologist</p>
                </div>

                <div className='w-full grid grid-cols-auto gap-4 gap-y-6' >
                    {docFilter.map( (item, index) => (
                        <div key={index} 
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:scale-105 transition-all duration-300'
                            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0);}}
                        >
                            <img src={item.image} alt="Doctor Image" 
                                className='bg-blue-50 hover:bg-blue-100'
                            />
                            <div className='p-4' > 
                                <div className={`flex items-center gap-2 text-sm text-center ${item.available ?  "text-green-700" : "text-red-700"} `}>
                                    <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-red-700'} bg-green-700 rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                                <p className='text-gray-600 text-sm' >{item.speciality}</p>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
        </div>
    )
}

export default Doctors