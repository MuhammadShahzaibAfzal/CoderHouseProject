import ErrorHandlerService from "../services/errorHandlerService.js";
import hashService from "../services/hashService.js";
import userService from "../services/userService.js";
import otpService from "../services/otpService.js";
import {
  activationValidationSchema,
  phoneValidationSchema,
  verifyOTPValidationSchema,
} from "../services/validationService.js";
import tokenService from "../services/tokenService.js";

class AuthController {
  async sendOTP(req, res, next) {
    const { phone } = req.body;
    /* VALIDATE REQUEST */
    const { error } = phoneValidationSchema.validate(phone);
    if (error) {
      return next(error);
    }
    /* GENERATE OTP */
    const otp = await otpService.genrateOTP();

    /* HASH OTP */
    const ttl = 1000 * 60 * 2; // 2 mint
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hashOtp = await hashService.hashOTP(data);

    /* SEND OTP ON MOBILE NUMBER (NOT HASHED OTP) */
    // try {
    //   await otpService.sendBySMS(otp, phone);
    // } catch (error) {
    //   return next(error);
    // }

    console.log("====================================");
    console.log(otp);
    console.log("====================================");
    return res.status(200).json({ otp, hash: `${hashOtp}.${expires}`, phone });
  }

  async verifyOTP(req, res, next) {
    const { phone, hash, otp } = req.body;
    /* VALIDATE REQUEST */
    const { error } = verifyOTPValidationSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const [hashedOtp, expires] = hash.split("."); // becasue we sent hash like hast.expires
    /* CHECK OTP IS EXPIRED OR NOT */
    if (Date.now() > +expires) {
      return next(ErrorHandlerService.badRequest("OTP is expired !"));
    }
    /* VALIDATE OTP */
    const data = `${phone}.${otp}.${expires}`;
    const isValid = await otpService.verifyOTP(hashedOtp, data);
    if (!isValid) {
      return next(ErrorHandlerService.badRequest("Invalid OTP"));
    }
    /* CHECK USER IS ALREADY EXIST IF EXIST THEN DON"T NEED TO CREATE IT OTHERWISE CREATE IT */
    let user;
    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      return next(error);
    }

    /* GENRATE TOKENS */
    const { accessToken, refreshToken } = await tokenService.genrateTokens({
      _id: user._id,
      isActivated: user.isActivated,
    });

    /* SAVE REFRESH TOKEN */
    try {
      await tokenService.storeRefreshToken({
        token: refreshToken,
        user: user._id,
      });
    } catch (error) {
      return next(error);
    }

    /* SET COOKIES */
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true, // not read javascript on frontend, only read in server
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // not read javascript on frontend, only read in server
    });

    return res.json({ isAuth: true, user });
  }

  async refresh(req, res, next) {
    /* GET TOKEN FROM COOKIES */
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    /* VERIFY REFRESH TOKEN */
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (error) {
      return next(ErrorHandlerService.unAuthorized("Invalid token"));
    }

    /* CHECK TOKEN IS IN DB */
    try {
      const isExist = await tokenService.findRefreshToken({
        user: userData._id,
        token: refreshTokenFromCookie,
      });
      if (!isExist) {
        return next(ErrorHandlerService.unAuthorized("Invalid token"));
      }
    } catch (error) {
      return next(error);
    }

    /* CHECK IF VALID USER CONFIRM */
    let user;
    try {
      user = await userService.findUser({ _id: userData._id });
      if (!user) {
        return next(ErrorHandlerService.notFound("Not Found"));
      }
    } catch (error) {
      return next(error);
    }
    /* GENRATE TOKENS */
    const { accessToken, refreshToken } = await tokenService.genrateTokens({
      _id: userData._id,
    });

    /* UPDATE REFRESH TOKEN */
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (error) {
      return next(error);
    }
    /* SET COOKIES */
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true, // not read javascript on frontend, only read in server
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // not read javascript on frontend, only read in server
    });

    return res.json({ isAuth: true, user });
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      /* REMOVE REFRESH TOKEN FROM DB */
      await tokenService.removeRefreshToken(refreshToken);
      /* DELETE COOKIES */
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      res.status(200).json({ isAuth: false, user: null });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();

export default authController;
