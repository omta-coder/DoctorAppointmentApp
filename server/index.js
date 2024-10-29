import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./routes/adminRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING GREAT!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
