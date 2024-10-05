import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utilis/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import companyroute from "./routes/company.route.js";
dotenv.config({});
const app = express();


//middlerware
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
const corsOptions ={
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));
const port=process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyroute);
app.use("/api/v1/job",jobRoute);


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
});
