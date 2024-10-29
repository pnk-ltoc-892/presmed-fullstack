import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db/index.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/admin.route.js'
import userRouter from './routes/user.route.js'
import doctorRouter from './routes/doctor.route.js'


// app config
const app = express()
const port = process.env.PORT || 3000

// Connect Database 
connectDB()

// Connect Cloudinary
connectCloudinary()



// Middlewares
app.use(express.json())
app.use(cors())

// api endpoints
// ! Admin Routes
app.use('/api/admin', adminRouter)


// ! Doctor Routes
app.use('/api/doctor', doctorRouter)


// ! User Routes
app.use('/api/user', userRouter)




app.get( '/' , (req, res) =>{
    const header = req.headers;
    
    return res.json({
        data: header.token
    })
} )

app.listen(port, () => console.log("Server Running on PORT: ", port))
