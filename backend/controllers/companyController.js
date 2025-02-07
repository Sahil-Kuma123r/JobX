import {Company} from '../models/companySchema.js';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({message: "Company name is required", success:false});
        }
        const comp = await Company.findOne({name : companyName});
        if(comp){
            return res.status(400).json({message: "Cannot register same company again", success:false});
        }

        const company = await Company.create({
            name: companyName,
            userId : req.id
        });

        res.status(201).json({message:"Company registered successfully", company, success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "Internal Server error",
            success : false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({message: "No company found", success:false});
        }
        res.status(200).json({message:"Companies found successfully", companies, success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "Internal Server error",
            success : false
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: "No company found", success:false});
        }
        res.status(200).json({message:"Company found successfully", company, success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "Internal Server error",
            success : false
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        //cloudinary
        let logo = "https://th.bing.com/th/id/OIP.qgp1rab4Db9aIZJ56hTD4wHaFj?w=252&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"; 
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url; 
        }

        const updateData = {name, description, website, location, logo};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(404).json({message: "No company found", success:false});
        }

        res.status(200).json({message:"Company information updated successfully", company, success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "Internal Server error",
            success : false
        });
    }
}