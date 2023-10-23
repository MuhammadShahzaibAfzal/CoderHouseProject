import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

/* LIST OF ALL THE ENDS POINTS */

export const sendOTP = (data) => api.post("/api/auth/send-otp", data);

export const verifyOTP = (data) => api.post("/api/auth/verify-otp", data);
