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

export const sendOTP = async (data) => api.post("/api/auth/send-otp", data);

export const verifyOTP = async (data) => api.post("/api/auth/verify-otp", data);

export const activate = (data) => api.post("/api/activate", data);

export const logout = () => api.get("/api/auth/logout");

export const createRoom = (data) => api.post("/api/rooms", data);

export const getRooms = () => api.get("/api/rooms");

/* AXIOS INTERCEPTORS

TWO TYPES OF INTERCPETORS : Request and Response

Har ek request aur reponse ke beech ma bathte ha... Har request ka response aur request ko check kar sakte ha

*/

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;
      // refresh token request
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/refresh`, {
          withCredentials: true,
        });

        //  original Request again
        return api.request(originalRequest);
      } catch (error) {
        // console.log('Error comes in interceptor');
        // console.log(error);
      }
    } else {
      throw error;
    }
  }
);

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const orignalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       orignalRequest &&
//       !orignalRequest._isRetry
//     ) {
//       orignalRequest._isRetry = true;
//       try {
//         /* REQUEST FOR REFRESH TOKEN */
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
//           {
//             withCredentials: true,
//           }
//         );

//         /* AGAIN REQUEST NOW AFTER REFRESH TOKEN */
//         return api.request(orignalRequest);
//       } catch (error) {
//         console.log(error.message);
//       }
//     } else {
//       throw error;
//     }
//   }
// );
