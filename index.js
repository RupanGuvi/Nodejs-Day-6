import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Database/dbConfig.js";
import authRoute from "./Routers/authRouter.js"
import serviceRoute from "./Routers/serviceRouter.js"
import bookrouter from "./Routers/bookingRouter.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/",(req,res)=>{
  res.status(200).send("Welcome to our api")
})

app.use("/api/auth", authRoute)
app.use("/api/service",serviceRoute)
app.use("/api/booking", bookrouter)

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("server started");
    
})