import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext)
    const [relatedDoc, setRelatedDoc] = useState([])

    const navigate = useNavigate()

    const fetchRelatedDoctors = () => {
        const relatedDoctors = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
        // console.log(relatedDoctors);
        setRelatedDoc(relatedDoctors)
    }

    useEffect(() => {
        fetchRelatedDoctors()
        // console.log(relatedDoc);
    }, [doctors, docId, speciality])    // ! Explore And Analyze This Dependency Array


    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-12'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors
            </p>
            <div className='w-full grid grid-cols-auto gap-4 pt-6 gap-y-6 px-3 sm:px-0' >
                {relatedDoc.slice(0, 5).map((item, index) => (
                    <div key={index}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:scale-105 transition-all duration-300'
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
                    >
                        <img src={item.image} alt="Doctor Image"
                            className='bg-blue-50 hover:bg-blue-100'
                        />
                        <div className='p-4' >
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-700" : "text-red-700"} `}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-red-700'} bg-green-700 rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                            <p className='text-gray-600 text-sm' >{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors