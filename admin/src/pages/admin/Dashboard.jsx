import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
    const { backendUrl, adminToken, dashboardData, getDashboardData } =
        useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    // ! Call For Data From FrontEnd, If Admin Token Is Available
    useEffect(() => {
        if (adminToken) {
            getDashboardData(); // ! Set Into State Varible, Automatically
            // console.log(dashboardData);
        }
    }, [adminToken]);

    const data = [
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
        {
            _id: "670f9289151f2f9926b6378b",
            userId: "6709667834b59a26fc71a73e",
            docId: "67093990b590703c9b0b856f",
            slotDate: "18_10_2024",
            slotTime: "10:30 am",
            userData: {
                _id: "6709667834b59a26fc71a73e",
                name: "Pankaj Singh",
                email: "pnk122@gmail.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728740502/szeci8i1ojlc0t0wxghw.png",
                address: {
                    line1: "52nd Road lane3",
                    line2: "Golf Course Road",
                },
                gender: "Male",
                dob: "2004-09-08",
                phone: "1234567890",
                __v: 0,
            },
            docData: {
                _id: "67093990b590703c9b0b856f",
                name: "Dr. Patrick Harris",
                email: "Patrick@presmed.com",
                image:
                    "http://res.cloudinary.com/learn-backend/image/upload/v1728657808/h5kr3wsnu4bxw4a2e5pg.png",
                speciality: "Neurologist",
                degree: "MBBS",
                experience: "4",
                about:
                    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                available: true,
                fee: 50,
                address: {
                    line1: "17th Cross, Richmond",
                    line2: "Circle, Ring Road, London",
                },
                date: 1728657808869,
                slotsBooked: {
                    "14_10_2024": ["10:00 am"],
                    "18_10_2024": ["10:30 am"],
                },
                __v: 0,
            },
            amount: 50,
            date: 1729073801664,
            cancel: true,
            payment: false,
            isCompleted: false,
            __v: 0,
        },
    ];

    return (
        // ! Render Only When Data Is Available
        dashboardData && (
            <div className="m-5">
                <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.doctor_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {dashboardData.doctors}
                            </p>
                            <p className="text-gray-500">Doctors</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.appointments_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {dashboardData.appointments}
                            </p>
                            <p className="text-gray-500">Appointments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.patients_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {dashboardData.users}
                            </p>
                            <p className="text-gray-500">Patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="flex items-center gap-3 p-4 mt-10 rounded-t border">
                        <img src={assets.list_icon} alt="" />
                        <p className="font-semibold">Latest Bookings</p>
                    </div>
                    <div className="pt-4 border border-t-0">
                        {
                            // ! Fix The Issue
                            data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                                >
                                    <img
                                        className="rounded-full w-10"
                                        src={item.docData.image}
                                        alt=""
                                    />
                                    <div className="flex-1 text-sm">
                                        <p className="text-gray-800 font-medium">
                                            {item.docData.name}
                                        </p>
                                        <p className="text-gray-700">
                                            {slotDateFormat(item.slotDate)}
                                        </p>
                                    </div>
                                    {item.cancel ? (
                                        <p className="text-red-400 text-xs font-medium">
                                            Cancelled
                                        </p>
                                    ) : item.isCompleted ? (
                                        <p className="text-green-600 text-xs font-medium">
                                            Completed
                                        </p>
                                    ) : (
                                        <img
                                            className="w-10 cursor-pointer"
                                            src={assets.cancel_icon}
                                            alt=""
                                            onClick={() => cancelAppointment(item._id)}
                                        />
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
