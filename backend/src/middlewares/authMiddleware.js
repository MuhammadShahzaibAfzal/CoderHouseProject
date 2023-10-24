import ErrorHandlerService from "../services/errorHandlerService.js";
import tokenService from "../services/tokenService.js";

const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) {
      throw new Error();
    }
    const data = await tokenService.verifyAccessToken(accessToken);
    if (!data) {
      throw new Error();
    }
    req.userData = data;
    next();
  } catch (error) {
    return next(ErrorHandlerService.unAuthorized());
  }
};

export default authMiddleware;
