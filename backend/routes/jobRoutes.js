import express from "express";
const router = express.Router();

import {postJob, getAllJobs, getJobsById, getAdminJobs} from '../controllers/jobController.js';
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.post("/post",isAuthenticated, postJob);
router.get("/getAllJobs", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobsById);
router.get("/getAdminJobs", isAuthenticated, getAdminJobs);

export default router;