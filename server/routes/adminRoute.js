import express, { Router } from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRoute = express.Router();
adminRoute.post("/add-doctor",authAdmin,upload.single("image"), addDoctor);
adminRoute.post("/login",loginAdmin);
adminRoute.post("/all-doctors",authAdmin,allDoctors);


export default adminRoute;
