import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

//API to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
   //validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    //validating strong password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
        name,
        email,
        password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    res.status(201).json({success:true,token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//API for user login
export const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.status(200).json({success:true,token})
        }else{
            return res.status(400).json({success:false,message:"Invalid password"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message }); 
    }
}