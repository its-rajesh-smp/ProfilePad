import { createSlice } from "@reduxjs/toolkit";
import { IAuthUser } from "../types/Auth.type";

interface IAuthState {
  isAuthenticated: boolean;
  authToken?: string;
  user: IAuthUser;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
    slug: "",
    profileImageSrc: "",
    headline: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
      localStorage.setItem("authToken", action.payload.authToken);
      return state;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      return state;
    },
    logout: () => {},
  },
});

export const { authenticate, logout, setUser } = authSlice.actions;
export default authSlice.reducer;