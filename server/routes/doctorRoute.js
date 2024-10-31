import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, loginDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRoute = express.Router();

doctorRoute.get('/list',doctorList);
doctorRoute.post('/login',loginDoctor)
doctorRoute.get('/appointments',authDoctor,appointmentsDoctor)
doctorRoute.post('/complete-appointment',authDoctor,appointmentComplete);
doctorRoute.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRoute.get('/dashboard',authDoctor,doctorDashboard)
 

export default doctorRoute