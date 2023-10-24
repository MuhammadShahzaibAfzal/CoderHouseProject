import { Router } from "express";
import activationController from "../controllers/activationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const activationRouter = Router();

activationRouter.post("/", authMiddleware, activationController.activate);

export default activationRouter;
