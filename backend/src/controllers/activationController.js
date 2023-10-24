import { ROOT_PATH } from "../server.js";
import ErrorHandlerService from "../services/errorHandlerService.js";
import userService from "../services/userService.js";
import { activationValidationSchema } from "../services/validationService.js";
import Jimp from "jimp";
import path from "path";

class ActivationController {
  async activate(req, res, next) {
    /* VALIDATE REQUEST */
    const { name, avatar } = req.body;
    const { error } = activationValidationSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    /* OUR IMAGE IS BASE 64 */
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    const jimpRes = await Jimp.read(buffer);
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    try {
      jimpRes
        .resize(150, Jimp.AUTO)
        .write(path.join(ROOT_PATH, `/storage/${imagePath}`));

      /* UPDATE USER */
      const userID = req.userData._id;
      const user = await userService.findUser({ _id: userID });
      if (!user) {
        return next(ErrorHandlerService.notFound());
      }
      user.isActivated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;

      await user.save();

      return res.status(200).json({ user, isAuth: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new ActivationController();
