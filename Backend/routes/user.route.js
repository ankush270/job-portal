import express from 'express';
import isAuthenticated from '../middleware/isAuthentic.js';
import {login,register,updateProfile} from "../controllers/user.controller.js";
const router =express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateProfile);
export default router;