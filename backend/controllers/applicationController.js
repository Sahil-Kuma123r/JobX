import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({message: "Job ID is required", success:false});
        }

        //checking if already applied
        const alreadyApplied = await Application.findOne({job:jobId, applicant:userId});
        if(alreadyApplied){
            return res.status(400).json({message: "You have already applied for this job", success:false});
        }

        //checking job exist or not
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found", success:false});
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({message: "Application submitted successfully", job, newApplication, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success:false});
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path: 'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!applications){
            return res.status(404).json({message: "No applications found", success:false});
        }
        return res.status(200).json({applications, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success:false});
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'applicant'
            }
        });
        if(!job){
            return res.status(404).json({message: "Job not found", success:false});
        }
        return res.status(200).json({job, success:true}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success:false});
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({message: "Status is required", success:false});
        }

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({message: "Application not found", success:false});
        }

        application.status = status.charAt(0).toUpperCase() + status.slice(1);
        await application.save();
        return res.status(200).json({message: "Status updated successfully",application, success:true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success:false});
    }
}