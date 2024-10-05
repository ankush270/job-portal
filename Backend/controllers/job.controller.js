import {Job} from "../models/job.model.js"
export const PostJob=async (req,res)=>{
    try{
        const {title, description, requirements ,salary, location, jobType, experience,position,companyId} = req.body;
        const userId=req.id;
        if(!title || !description || !requirements || !salary || !location || !experience || !position || !companyId) {
            return res.status(400).json({
                message: 'All fields are required',
                success:false,
            });
        }
        const job=await Job.create({
            title,
            description, 
            requirements:requirements.split(","),
            salary:Number(salary), 
            location, 
            jobType, 
            experienceLevel:experience,
             position,
             company: companyId,
             created_by:userId
        })
        return res.status(200).json({
            message: 'Job Posted Successfully',
           job,
            success: true
        }); 
    }
    catch(error){
        console.error(error);
        res.status(500).send('Server Error');
    }
}

export const getAllJobs=async (req,res)=>{
    try{
       const keyword=req.query.keyword || "";
       const query={
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
            // {requirements:{$regex:keyword,$options:"i"}},
            // {location:{$regex:keyword,$options:"i"}},
            // {position:{$regex:keyword,$options:"i"}},
            // {company:{$regex:keyword,$options:"i"}},
        ]
       };
       const jobs=await Job.find(query);
       if(!jobs){
        return res.status(404).json({
            message: 'No Jobs Found',
            success: false
        });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
       }
    catch(error){
        console.error(error);
        res.status(500).send('Server Error');
    }
}

export const getJobById=async (req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: 'No Job Found',
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    }
    catch(error){
        console.error(error);
        res.status(500).send('Server Error');
    }
}

//ab ye admin kitna job create kra hai abhi tk
export const getAdminJobs=async (req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.findById({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message: 'No jobs Found',
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    }
    catch(error){
        console.error(error);
        res.status(500).send('Server Error');
    }
}