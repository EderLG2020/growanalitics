import { createSlice } from "@reduxjs/toolkit";

const savedToken = sessionStorage.getItem("token");
const initialToken = savedToken && savedToken !== "undefined" ? savedToken : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: initialToken, 
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token"); 
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
