import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  handleFulfilledLogOut,
  handleFulfilledRefreshUser,
  handleFulfilledSignUpLogIn,
  handlePending,
  handleRejected,
} from "./helpers";
import { logIn, logOut, refreshUser, signUp } from "./operations";

const initialState = {
  user: { email: "", password: "" },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
};

const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export const arrayThunk = [signUp, logIn, logOut, refreshUser];

export const thunkStatus = (type) => arrayThunk.map((el) => el[type]);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.user.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, handleFulfilledSignUpLogIn)
      .addCase(logIn.fulfilled, handleFulfilledSignUpLogIn)
      .addCase(logOut.fulfilled, handleFulfilledLogOut)
      .addCase(refreshUser.fulfilled, handleFulfilledRefreshUser)
      .addMatcher(isAnyOf(...thunkStatus(STATUS.PENDING)), handlePending)
      .addMatcher(isAnyOf(...thunkStatus(STATUS.REJECTED)), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
export const { addEmail } = authSlice.actions;
