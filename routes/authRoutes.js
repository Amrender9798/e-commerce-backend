// routes/authRoutes.js
import { Router } from "express";
import { register, login, setPassword } from "../controllers/authController.js";
import sendEmail from "../middlewares/nodemailer.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset",sendEmail);
router.post("/set", setPassword);

export default router;
