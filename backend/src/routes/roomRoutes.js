import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roomsController from "../controllers/roomsController.js";

const roomRouter = Router();

roomRouter.post("/", authMiddleware, roomsController.createRoom);
roomRouter.get("/", roomsController.getAllRooms);

export default roomRouter;
