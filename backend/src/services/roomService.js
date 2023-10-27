import RoomModel from "../models/roomModel.js";

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    return await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
  }

  async getRooms(filter) {
    return await RoomModel.find(filter)
      .populate("speakers")
      .populate("ownerId")
      .exec();
  }
}

export default new RoomService();
