import { Router } from "express"
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, getDoctorList, getDoctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctor.controlller.js"
import { doctorAuth } from "../middlewares/auth.doctor.js"

const doctorRouter = Router()


doctorRouter.get('/list', getDoctorList)

doctorRouter.post('/login', loginDoctor)

doctorRouter.get('/appointments', doctorAuth, appointmentsDoctor)

doctorRouter.post('/complete-appointment', doctorAuth, appointmentComplete)

doctorRouter.post('/cancel-appointment', doctorAuth, appointmentCancel)

doctorRouter.get('/dashboard', doctorAuth, doctorDashboard)

doctorRouter.get('/my-profile', doctorAuth, getDoctorProfile)

doctorRouter.post('/update-profile', doctorAuth, updateDoctorProfile)



export default doctorRouter