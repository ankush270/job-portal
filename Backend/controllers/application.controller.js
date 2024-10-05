import {Application} from "../models/application.model.js";
import {User} from "../models/user.model.js";
import { Job } from "../models/job.model.js";
export const applyJob=async (req,res)=>{
    try{
        const userId = req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: 'No job ID provided',
                success:false
            });
        };
        const existingApplication = await Application.findOne({job:jobId,applicant:userId}); 
        if(existingApplication){
            return res.status(400).json({
                message: 'Application already submitted for this job',
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId});
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: 'Application submitted successfully',
            success: true
        })  
    }
    catch(err){
        console.error(err);
        return res.status(500).send('Server Error');
    }
}

export const getAppliedJobs=async (req,res)=>{
try{
    const userId = req.id;
    const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{path:'company', options:{sort:{createdAt:-1}},}
    });
    if(!applications){
        return res.status(404).json({
            message: 'No applications found',
            success: false
        });
    }
    return res.status(200).json({
        applications,
        success: true
    })
}catch(err){
    console.error(err);
    return res.status(500).send('Server Error');
}
}
//admin dekhega kitna user ne apply kia
export const getApplicants=async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{path:'applicant', options:{sort:{createdAt:-1}},}
        });
       if(!job){
        return res.status(404).json({
            message: 'Job not found',
            success: false
        });
       }
       return res.status(200).json({
        job,
        success: true 
    });
    }catch(err){
        console.error(err);
        return res.status(500).send('Server Error');
    }
}

export const updateStatus=async(req,res)=>{
    try{
        const applicationId = req.params.id;
        const {status} = req.body;
        const application = await Application.findOne({_id: applicationId});
        if(!status){
            return res.status(400).json({
                message: 'status is required',
                success: false
            });
        }
        if(!application){
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"status update succesfully",
            success: true
        });
    }catch(err){
        console.error(err);
        return res.status(500).send('Server Error');
    }
}