import crypto from "crypto";
import { HASH_SECRET } from "../config/index.js";

class HashService {
  async hashOTP(data) {
    return crypto.createHmac("sha256", HASH_SECRET).update(data).digest("hex");
  }
}

export default new HashService();
