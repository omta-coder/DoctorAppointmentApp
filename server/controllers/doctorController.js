import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res
      .status(200)
      .json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API for doctor login
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {

      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
      
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to get doctor appointments for doctor panel
export const appointmentsDoctor = async(req,res)=>{
  try {
    const {docId} = req.body;
    const appointments = await appointmentModel.find({docId})
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//API to mark appointment completed for doctor
export const appointmentComplete = async(req,res)=>{
  try {
    const {docId,appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
      res.json({success:true,message:"Appointment completed successfully"})
    }else{
      res.json({success:false,message:"Invalid appointment or doctor id"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
//API to cancel appointment for doctor panel
export const appointmentCancel = async(req,res)=>{
  try {
    const {docId,appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      res.json({success:true,message:"Appointment cancelled successfully"})
    }else{
      res.json({success:false,message:"Cancellation Failed!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//API to get dashboard data for doctor panel
export const doctorDashboard = async(req,res)=>{
  try {
    const {docId} = req.body;
    const appointments = await appointmentModel.find({docId})
    let earnings = 0
    appointments.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings += item.payment
      }
    })
    let patients = []
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })
    const dashData = {
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true,message:"Dashboard data fetched successfully",dashData})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}