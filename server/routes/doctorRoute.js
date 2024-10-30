import express from 'express'
import { appointmentsDoctor, doctorList, loginDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRoute = express.Router();

doctorRoute.get('/list',doctorList);
doctorRoute.post('/login',loginDoctor)
doctorRoute.get('/appointments',authDoctor,appointmentsDoctor)
 

export default doctorRoute