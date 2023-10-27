import ErrorHandlerService from "../services/errorHandlerService.js";
import roomService from "../services/roomService.js";

class RoomController {
  async createRoom(req, res, next) {
    /* VALIDATE REQUEST */
    const { topic, roomType } = req.body;
    if (!topic || !roomType) {
      return next(ErrorHandlerService.validationError());
    }

    /* CREATE ROOM */
    try {
      const room = await roomService.create({
        topic,
        roomType,
        ownerId: req.userData._id,
      });

      return res.status(200).json({
        room,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAllRooms(req, res, next) {
    try {
      const rooms = await roomService.getRooms({ roomType: "open" });
      return res.status(200).json(rooms);
    } catch (error) {
      return next(error);
    }
  }
}

export default new RoomController();
