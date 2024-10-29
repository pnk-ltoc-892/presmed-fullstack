import mongoose from "mongoose"
import { Doctor } from "../models/doctor.model.js"
import { Appointment } from "../models/appointment.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const getDoctorList = async (req, res) => {
    try {        
        const doctors = await Doctor.find({}).select(['-password', '-email'])

        return res.json({
            success: true,
            message: "Doctor Fetched",
            doctors: doctors
        })
    } 
    catch (error) {
        console.log("Error While Fetching Doctor: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

const toggleDoctorAvailability = async (req, res) => {
    try {
        const { docId , currentStatus} = req.body
        
        const doctor = await Doctor.findByIdAndUpdate(docId, {available: !currentStatus})
        
        return res.json({
            success: true,
            message: "Doctor Availbility Toggled",
            data: !currentStatus
        })
    }
    catch (error) {
        console.log("Error While Toggling Doctor Availability: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API for doctor Login
const loginDoctor = async (req, res) => {
    try {        
        const {email, password} = req.body
        const doctor = await Doctor.findOne({email})
        if(!doctor){
            return res.json({
                success: false,
                message: "Doctor Not Found",
                data: {}
            })
        }
        const verifyPassword = await bcrypt.compare(password, doctor.password)
        if(!verifyPassword){
            return res.json({
                success: false,
                message: "Incorrect Password",
                data: {}
            })
        }
        const jwtToken = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
        return res.json({
            success: true,
            message: "Doctor Login Success",
            token: jwtToken
        })
    } 
    catch (error) {
        console.log("Error While Logging In Doctor: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}


// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {        
        const { docId } = req.body
        const appointments = await Appointment.find({
            docId: docId
        })

        return res.json({
            success: true,
            message: "Doctor Appointment Fetched",
            appointments: appointments
        })
    } 
    catch (error) {
        console.log("Error Fetching Doctor Appointments: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API to mark appointment complete for doctor panel
const appointmentComplete = async (req, res) => {
    try {        
        const { docId, appointmentId } = req.body
        const appointment = await Appointment.findById(appointmentId)
        if(!appointment || docId !== appointment.docId){
            return res.json({
                success: false,
                message: "Invalid Appointment / Authentication Error",
                data: {}
            })
        }

        await Appointment.findByIdAndUpdate(appointmentId, {isCompleted: true})

        return res.json({
            success: true,
            message: "Appointment Completed",
            data: {}
        })
    } 
    catch (error) {
        console.log("Error While Marking Appointment Complete: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {        
        const { docId, appointmentId } = req.body
        const appointment = await Appointment.findById(appointmentId)
        if(!appointment || docId !== appointment.docId){
            return res.json({
                success: false,
                message: "Invalid Appointment / Authentication Error",
                data: {}
            })
        }

        await Appointment.findByIdAndUpdate(appointmentId, {cancel: true})

        return res.json({
            success: true,
            message: "Appointment Cancelled",
            data: {}
        })
    } 
    catch (error) {
        console.log("Error While Cancelling Appointment: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API to get Doctor Dashboard for doctor panel
const doctorDashboard = async (req, res) => {
    try {        
        const { docId } = req.body
        const appointments = await Appointment.find({docId})

        let earnings = 0
        appointments.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.json({
            success: true,
            message: "Doctor Dashboard Data Fetched",
            data: dashData
        })
    } 
    catch (error) {
        console.log("Error While Fetching Doctor Dashboard Data: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API for getting Doctor Profile
const getDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.body

        const doctor = await Doctor.findById(docId).select('-password')
        if(!doctor){
            return res.json({
                success: false,
                message: "Doctor Not Found",
            })
        }
        return res.json({
            success: true,
            message: "Doctor Profile Fetched",
            doctor
        })
    }
    catch (error) {
        console.log("Error While Fetching Doctor Profile: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

// API for getting Doctor Profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fee, address, available } = req.body

        const doctor = await Doctor.findByIdAndUpdate(docId, {fee, address, available})
        return res.json({
            success: true,
            message: "Doctor Profile Updated",
            data: {}
        })
    }
    catch (error) {
        console.log("Error While Updating Doctor Profile: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

export {
    toggleDoctorAvailability,
    getDoctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    getDoctorProfile,
    updateDoctorProfile
}