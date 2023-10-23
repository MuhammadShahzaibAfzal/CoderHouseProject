import crypto from "crypto";
import { SMS_AUTH_TOKEN, SMS_PHONE_NUMBER, SMS_SID } from "../config/index.js";
import twilio from "twilio";
import hashService from "./hashService.js";

const client = twilio(SMS_SID, SMS_AUTH_TOKEN, {
  lazyLoading: true,
});

class OTPService {
  async genrateOTP() {
    return crypto.randomInt(1000, 9999);
  }

  async sendBySMS(otp, phone) {
    return await client.messages.create({
      body: `Your otp code is ${otp}`,
      to: phone,
      from: SMS_PHONE_NUMBER,
    });
  }

  async verifyOTP(hashedOTP, data) {
    const computedHash = await hashService.hashOTP(data);
    return hashedOTP === computedHash;
  }
}

export default new OTPService();
