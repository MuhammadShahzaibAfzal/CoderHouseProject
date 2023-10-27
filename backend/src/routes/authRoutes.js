import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/logout", authMiddleware, authController.logout);

export default authRouter;
