import express from 'express'
import { doctorList } from '../controllers/doctorController.js';

const dooctorRoute = express.Router();

dooctorRoute.get('/list',doctorList)

export default dooctorRoute