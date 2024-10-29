import { Router } from "express"
import { registerUser, loginUser, getUserProfile, updateUserProfile, bookAppointment, getUserAppointments, cancelAppointment, paymentRazorPay, verifyPayment } from "../controllers/user.controller.js"
import { userAuth } from "../middlewares/auth.user.js"
import upload from "../middlewares/multer.js"

const userRouter = Router()


userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-user', userAuth , getUserProfile)


// userRouter.post('/update-user-profile', userAuth , upload.single('image') , updateUserProfile) // ! Why Shift This POsition of middleware

userRouter.post('/update-user-profile', upload.single('image'), userAuth, updateUserProfile)


userRouter.post('/book-appointment', userAuth, bookAppointment)


userRouter.get('/get-user-appointments', userAuth, getUserAppointments)


userRouter.put('/cancel-user-appointments', userAuth, cancelAppointment)


userRouter.post('/payement-appointment', userAuth, paymentRazorPay)


userRouter.post('/verify-payement', userAuth, verifyPayment)



userRouter.get('/', (req, res) => {
    res.json({
        msg: "Hello Server"
    })
})



export default userRouter