import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import dooctorRoute from './routes/doctorRoute.js'


//app config
const app = express()
const port = process.env.PORT || 3000
connectDB();
connectCloudinary();

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRoute)
app.use('/api/doctor',dooctorRoute)

app.get('/', (req, res) => {
    res.send('API WORKING GREAT!')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})