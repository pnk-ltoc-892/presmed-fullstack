import validator from "validator"
import bcrypt from "bcrypt"
import { User } from '../models/user.model.js' 
import { Appointment } from '../models/appointment.model.js' 
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../config/cloudinary.js"
import { Doctor } from "../models/doctor.model.js"
// import razorpay from "razorpay"
// import { razorPayInstance } from "../config/razorpay.js"

// ! Lots Of Edge Cases Are Ignored Can Be Fixed Later On

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password){
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
        
        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        return res.json({
            success: true,
            message: "User Registered",
            token: token
        })
    } 
    catch (error) {
        console.log("Error While Registering User: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

// API for userLogin
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email: email
        })
        if(!user){
            return res.json({
                success: false,
                message: "User Not Found",
            })
        }

        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword){
            return res.json({
                success: false,
                message: "Incorrect Password",
            })
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        return res.json({
            success: true,
            message: "User Logged In",
            token: token
        })
    }
    catch (error) {
        console.log("Error While Admin Login: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}


// API for getting Current User Data
const getUserProfile = async (req, res) => {
    // console.log(req.headers);
    try {
        const { userId } = req.body

        const user = await User.findById(userId).select('-password')
        if(!user){
            return res.json({
                success: false,
                message: "User Not Found",
            })
        }
        return res.json({
            success: true,
            message: "User Data Fetched",
            user
        })
    }
    catch (error) {
        console.log("Error While Fetching Current User: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

// API for getting Current User Data
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        
        if( !userId || !name || !phone || !address || !dob || !gender ){
            return res.json({
                success: false,
                message: "User Data Missing",
            })
        }

        const user = await User.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
        
        if(imageFile){
            const { url } = await uploadOnCloudinary(imageFile.path)
            await User.findByIdAndUpdate(userId, {image: url})
        }
        
        return res.json({
            success: true,
            message: "User Data Updated",
            data: user
        })
    }
    catch (error) {
        console.log("Error While Fetching Current User: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}


// API to book appointment
// ! Basic - Book If The Slot Is Availble, Assume - One Slot is For One 'Patient'
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body        
        if( !docId || !slotDate || !slotTime){
            return res.json({
                success: false,
                message: "Data Missing",
            })
        }
        
        const user = await User.findById(req.body.userId).select('-password')
        const doctor = await Doctor.findById(docId).select('-password')

        // ! Should Not Be Even Displayed On frontend 
        if(!doctor.available){
            return res.json({
                success: false,
                message: "Doctor Unavailable",
            })
        }

        // * slotsBooked: {}         _________________________
        let slotsBooked = Object(doctor.slotsBooked)  // Create a Copy Of Slots
        // ! There Is a serious Issue Over Here - Resolved
        // * Accessing Wrong Property of Doctos Model :(

        // Check Slot Availbility
        // ! slots_booked[slotDate] if this key not present if will evaluate to false
        // if( slots_booked && slots_booked[slotDate]){
        // if(slots_booked && slots_booked.hasOwnProperty()){
        
        // if(typeof slots_booked === 'object' && slots_booked !== null && slotDate in slots_booked){
        if(slotsBooked[slotDate]){            
            if(slotsBooked[slotDate].includes(slotTime)){
                return res.json({
                    success: false,
                    message: "Doctor Slot Unavailable",
                })
            }
             // ? All Slots For This Date Are Availble
            else{
                slotsBooked[slotDate].push(slotTime)
            }
        }
        else{
            slotsBooked[slotDate] = []
            slotsBooked[slotDate].push(slotTime)
        }

        // Remove Booked Slots History - not needed in doctor data of appointment for FE
        // delete doctor.slots_booked
        
        // ! Update Doctor Slots Data
        await Doctor.findByIdAndUpdate(doctor._id, {slotsBooked})


        const appointment = await Appointment.create({
            userId: req.body.userId,
            docId,
            slotDate,
            slotTime,
            userData: user,
            docData:doctor,
            amount: doctor.fee,
            date: Date.now()
        })
        // ! Check If entry not created throw error
        

        return res.json({
            success: true,
            message: "Appointment Booked",
            data: appointment
        })
    }
    catch (error) {
        console.log("Error While Booking Appointment: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}


// API to get User appointment
const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.body        
        
        
        const appointments = await Appointment.find({
            userId: userId
        })

        return res.json({
            success: true,
            message: "Appointment Fetched",
            data: appointments
        })
    }
    catch (error) {
        console.log("Error While Fetching User Appointments: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}


// API to cancel User appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId, userId } = req.body        
        
        const appointment = await Appointment.findById(appointmentId)
        // console.log(appointment);
        if(appointment.userId !== userId){
            return res.json({
                success: flase,
                message: "Unauthorized Action",
                data: {}
            })
        }
        await Appointment.findByIdAndUpdate(appointmentId, {cancel: true})

        const { docId, slotDate, slotTime } = appointment
        // ! Free Doctor Slots
        const doctor = await Doctor.findById(docId)
        // console.log(doctor.slotsBooked);
        
        // ! Filter Slots
        const updatedSlots = doctor.slotsBooked
        updatedSlots[slotDate] = updatedSlots[slotDate].filter( slot => slot !== slotTime )
        console.log(updatedSlots);
        
        await Doctor.findByIdAndUpdate(docId, {slotsBooked: updatedSlots})
        // console.log(newDoctor.slotsBooked);

        return res.json({
            success: true,
            message: "Appointment Cancelled",
            data: {}
        })
    }
    catch (error) {
        console.log("Error While Cancelling User Appointments: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

// API to make appointment payement by RazorPay
const paymentRazorPay = async (req, res) => {
    try {
        const { appointmentId } = req.body        
        
        const appointmentData = await Appointment.findById(appointmentId)
        if(!appointmentData || appointmentData.cancel){
            return res.json({
                success: false,
                message: "Appointment Not Found Or Cancelled",
                data: {}
            })
        }
        // Creating Options For RazorPay Payement
        const options = {
            amount: appointmentData.amount, // See The Structure Of How amount is Stored
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }
        // Create An Order
        // const order = await razorPayInstance.orders.create(options)

        return res.json({
            success: true,
            message: "Payement Initiated",
            data: {}
        })
    }
    catch (error) {
        console.log("Error While Initiating User Payement: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}

// API to Verify appointment fee Payement
const verifyPayment = async (req, res) => {
    try {
        const { razorPayOrderId, appointmentId } = req.body    
        // const orderInfo = await razorPayInstance.orders.fetch(razorPayOrderId)  
        let orderInfo = {
            status: 'paid',
            receipt: appointmentId
        }

        if(orderInfo.status === 'paid'){
            await Appointment.findByIdAndUpdate(orderInfo.receipt, {payment: true})
        }
        else{
            return res.json({
                success: false,
                message: "Payement Failed",
                data: {}
            })
        }

        return res.json({
            success: true,
            message: "Payement SuccessFull",
            data: {}
        })
    }
    catch (error) {
        console.log("Error While Verifying User Payement: ", error);
        return res.json({
            success: false,
            error: error
        })
    }
}





export { 
        registerUser,
        loginUser,
        getUserProfile,
        updateUserProfile,
        bookAppointment,
        getUserAppointments,
        cancelAppointment,
        paymentRazorPay,
        verifyPayment
        }