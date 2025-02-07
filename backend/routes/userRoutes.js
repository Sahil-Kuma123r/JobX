import express from "express";
const router = express.Router();

import {signup, login, logout, updateProfile} from '../controllers/userController.js';
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

router.post("/signup",singleUpload, signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;