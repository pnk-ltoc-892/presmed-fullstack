import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const DoctorDashboard = () => {
    const { doctorToken, dashData, fetchDashboardData, cancelAppointment, completeAppointment } = useContext(DoctorContext);

    const { slotDateFormat } = useContext(AppContext);


    useEffect(() => {
        if (doctorToken) {
            // ! Find Better Way To Do This, Auth on Frontend
            fetchDashboardData();
        }
    }, []);

    if (!dashData) {
        // ! DashData  - false Intially
        return <div>Loading...</div>;
    }
    return (
        dashData && (
            <div className="m-5">
                <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.earning_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                $ {dashData.earnings}
                            </p>
                            <p className="text-gray-500">Earnings</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.appointments_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {dashData.appointments}
                            </p>
                            <p className="text-gray-500">Appointments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                        <img src={assets.patients_icon} alt="" className="w-14" />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {dashData.patients}
                            </p>
                            <p className="text-gray-500">Patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="flex items-center gap-3 p-4 mt-10 rounded-t border">
                        <img src={assets.list_icon} alt="" />
                        <p className="font-semibold">Latest Appointments</p>
                    </div>
                    <div className="pt-4 border border-t-0">
                        {
                            // ! Fix The Issue
                            dashData.latestAppointments.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                                >
                                    <img
                                        className="rounded-full w-10"
                                        src={item.userData.image}
                                        alt=""
                                    />
                                    <div className="flex-1 text-sm">
                                        <p className="text-gray-800 font-medium">
                                            {item.userData.name}
                                        </p>
                                        <p className="text-gray-700">
                                            {slotDateFormat(item.slotDate)}
                                        </p>
                                    </div>
                                    {item.isCompleted ? (
                                        <p className="text-green-700 text-md font-medium">
                                            Completed
                                        </p>
                                    ) : item.cancel ? (
                                        <p className="text-red-700 text-md font-medium">
                                            Cancelled
                                        </p>
                                    ) : (
                                        <div className="flex gap-3">
                                            <img
                                                className="w-10 cursor-pointer"
                                                src={assets.cancel_icon}
                                                alt=""
                                                onClick={() => cancelAppointment(item._id)}
                                            />
                                            <img
                                                className="w-10 cursor-pointer"
                                                src={assets.tick_icon}
                                                alt=""
                                                onClick={() => completeAppointment(item._id)}
                                            />
                                        </div>
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

export default DoctorDashboard;
