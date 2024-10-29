// API for adding doctor
import validator from "validator";
import bcrypt from "bcrypt"
import { uploadOnCloudinary } from "../config/cloudinary.js";
import jwt from 'jsonwebtoken'

import { User } from '../models/user.model.js' 
import { Doctor } from '../models/doctor.model.js' 
import { Appointment } from "../models/appointment.model.js";

// ! Doctor Should Not Already Exist, No Duplicate Entry

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, available, fee, address } = req.body
        const imageFile = req.file
        // console.log({ name, email, password, speciality, degree, experience, about, available, fee, address });
        // console.log('Image file: ', imageFile);
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !available || !fee || !address || !imageFile){
            return res.json({
                success: false,
                message: 'Missing Details'
            })
        }
        // Validating Inputs
        // Email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Enter Valid Email'
            })
        }
        // Strong Password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Enter Strong Password Email'
            })
        }
        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const cloudinaryImage = await uploadOnCloudinary(imageFile.path)
        
        const doctor = await Doctor.create({
            name,
            email, 
            speciality, 
            degree, 
            experience, 
            about, 
            available, 
            fee, 
            address: JSON.parse(address),
            password: hashedPassword,
            image: cloudinaryImage.url,
            date: Date.now(),
        })

        return res.json({
            success: true,
            message: "Doctor Added",
            data: doctor
        })
    } 
    catch (error) {
        console.log("Error While Adding Doctor: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API for adminLogin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Invalid Admin Login ceredentials"
            })
        }
        // ! Token has admin Details, Which is insecure Kinldy FIX IT UP!!!
        const token = await jwt.sign(password+email, process.env.JWT_SECRET)
        return res.json({
            success: true,
            message: "Admin Login Success",
            token: token
        })
    } 
    catch (error) {
        console.log("Error While Admin Login: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API to get all doctors
const allDoctors = async (req, res) => {
    try {        
        const doctors = await Doctor.find({}).select('-password')

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


// API to get all appointments list
const allAppointments = async (req, res) => {
    try {        
        const appointments = await Appointment.find({})

        return res.json({
            success: true,
            message: "Appointments Fetched",
            appointments: appointments
        })
    } 
    catch (error) {
        console.log("Error While Fetching Appointments: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

// API to cancel User appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body        
        
        const appointment = await Appointment.findById(appointmentId)
        
        await Appointment.findByIdAndUpdate(appointmentId, {cancel: true})

        const { docId, slotDate, slotTime } = appointment
        // ! Free Doctor Slots
        const doctor = await Doctor.findById(docId)
        
        // ! Filter Slots
        const updatedSlots = doctor.slotsBooked
        updatedSlots[slotDate] = updatedSlots[slotDate].filter( slot => slot !== slotTime )
        // console.log(updatedSlots);
        
        await Doctor.findByIdAndUpdate(docId, {slotsBooked: updatedSlots})

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
            error: error
        })
    }
}

// API to get Dashboard Data
const getDashboardData = async (req, res) => {
    try {
        const users = await User.find({})
        const doctors = await Doctor.find({})
        const appointments = await Appointment.find({})

        return res.json({
            success: true,
            message: "Dashboard Data Fetched",
            data: {
                users: users.length,
                doctors: doctors.length,
                appointments: appointments.length,
                latestAppointments: appointments.reverse().slice(0,5)
            }
        })
    }
    catch (error) {
        console.log("Error While Fetching Dashboard Data: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

export { 
        addDoctor,
        loginAdmin,
        allDoctors,
        allAppointments,
        cancelAppointment,
        getDashboardData
        }