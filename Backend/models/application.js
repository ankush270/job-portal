import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Accepted','rejected'],
        default:'Pending'
    }
},{timestamps:true});
export const Application = mongoose.model('Application', applicationSchema);