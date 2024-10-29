import express from "express";
import {addDoctor, allAppointments, allDoctors, cancelAppointment, getDashboardData, loginAdmin} from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'
import { adminAuth } from "../middlewares/auth.admin.js";
import { toggleDoctorAvailability } from "../controllers/doctor.controlller.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', adminAuth, upload.single('image') ,addDoctor)  // Form Data - We will have an image

adminRouter.post('/login', loginAdmin)

adminRouter.get('/get-doctors', adminAuth, allDoctors)

adminRouter.patch('/toggle-doctor-availability', adminAuth, toggleDoctorAvailability)

adminRouter.get('/appointments', adminAuth, allAppointments)

adminRouter.post('/cancel-appointment', adminAuth, cancelAppointment)

adminRouter.get('/get-dashboard-data', adminAuth, getDashboardData)


export default adminRouter