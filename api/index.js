import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import studentRoutes from "./routes/student.js";
import authroutes from "./routes/authroutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import waitingRoutes from "./routes/waitingRoutes.js";
import getComplaint from "./routes/complaintRoutes.js";

const app = express();
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "api", ".env") });
const mongoUri = process.env.MONGO || "mongodb://127.0.0.1:27017/hostelapp";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.static(path.join(__dirname,'/ease_manager/dist')));
app.use(express.json())
// app.use(express.urlencoded)
app.use("/student",studentRoutes)
app.use('/api/student', bookRoutes);
app.use("/api/student",authroutes)
app.use("/api/admin",adminRoutes)
app.use("/api/waiting",waitingRoutes)
app.use("/api/complaint",getComplaint)
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })
  })
app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin page")
})
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'ease_manager','dist','index.html'))
})
app.listen(3000,(req,res)=>{
    console.log("LISTENING TO PORT 3000")
})