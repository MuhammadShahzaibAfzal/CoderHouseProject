import dotenv from "dotenv";
dotenv.config();

export const APP_PORT = process.env.APP_PORT || 5500;
export const DEBUG_MODE = process.env.DEBUG_MODE;
export const HASH_SECRET = process.env.HASH_SECRET;
export const SMS_SID = process.env.SMS_SID;
export const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN;
export const SMS_PHONE_NUMBER = process.env.SMS_PHONE_NUMBER;
export const DB_URL = process.env.DB_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
