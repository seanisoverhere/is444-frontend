import { createSlice } from "@reduxjs/toolkit";


const isLoggedIn = localStorage.getItem("user");

let authenticationState = { isAuthenticated: false, activity: "" };

if (isLoggedIn) {
  authenticationState.isAuthenticated = true;
}

const initialAuthState = authenticationState;

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.activity = action.payload;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.activity = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const authSelector = (state) => state.activity;

export default authSlice.reducer;
