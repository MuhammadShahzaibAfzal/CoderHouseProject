import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import activateReducer from "./slices/activateSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    activate: activateReducer,
  },
});
