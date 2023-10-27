import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/index.js";
import RefreshModel from "../models/refreshModel.js";

class TokenService {
  async genrateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }

  async storeRefreshToken(data) {
    await RefreshModel.create(data);
  }

  async findRefreshToken(filter) {
    return await RefreshModel.findOne(filter);
  }

  async updateRefreshToken(userID, refreshToken) {
    return await RefreshModel.updateOne(
      { user: userID },
      { token: refreshToken }
    );
  }

  async removeRefreshToken(refreshToken) {
    await RefreshModel.deleteOne({ token: refreshToken });
  }
}

export default new TokenService();
