import express from "express";
const router = express.Router();

import {applyJob, getApplicants, getAppliedJobs, updateStatus} from "../controllers/applicationController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.get("/apply/:id",isAuthenticated, applyJob);
router.get("/get",isAuthenticated, getAppliedJobs);
router.get("/:id/applicants",isAuthenticated, getApplicants);
router.post("/status/update/:id", isAuthenticated, updateStatus);

export default router;