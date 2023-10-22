import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO :  Check into local storage and if not then system default theme select
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      return {
        theme: state.theme === "dark" ? "light" : "dark",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
