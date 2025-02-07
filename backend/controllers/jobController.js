import { Job } from "../models/jobSchema.js";

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({message:"Please fill all the details", success:false});
        }

        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            salary : Number(salary),
            location,
            jobType,
            experienceLevel : experience,
            position,
            company : companyId,
            created_by : req.id
        });

        return res.status(201).json({message:"Job created successfully", job, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success : false});
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title : {$regex : keyword, $options : "i"} },
                {description : {$regex : keyword, $options : "i"} },
                {requirements : {$regex : keyword, $options : "i"} },
                {location : {$regex : keyword, $options : "i"} },
                {jobType : {$regex : keyword, $options : "i"} },
            ]
        };
        const jobs = await Job.find(query).populate("company").populate("created_by").sort({createdAt : -1});
        if(!jobs){
            return res.status(404).json({message:"No jobs found", success : false});
        }
        return res.status(200).json({message:"Jobs fetched successfully",jobs, success : true});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success : false});
    }
}

export const getJobsById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({message:"Job not found", success : false});
        }
        return res.status(200).json({message:"Job fetched successfully", job, success : true});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error", success : false});
    }
}

//for recruiter
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by : adminId}).populate("company").populate("created_by").sort({createdAt : -1});
        if(!jobs){
            return res.status(404).json({message:"No jobs found", success : false});
        }
        return res.status(200).json({message:"Jobs fetched successfully", jobs, success : true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error", success: false});
    }
}