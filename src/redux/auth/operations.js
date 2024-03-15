import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

axios.defaults.baseURL = "https://auth-qa.qencode.com/v1/auth";

// /access-token
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const auth = createAsyncThunk("auth", async (access_id, thunkAPI) => {
  try {
    const res = await axios.post("/access-token", access_id);
    console.log(res);
    // setAuthHeader(res.data.token);
    // Notify.success("You are logged in!");

    return res.data;
  } catch (error) {
    Notify.failure("Wrong email. Please try again!");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post("/login", data);
    setAuthHeader(res.data.token);
    Notify.success("You are logged in!");

    return res.data;
  } catch (error) {
    Notify.failure("Wrong password or email. Please try again!");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", body);

      setAuthHeader(res.data.token);
      Notify.success("Welcome to phonebook!");
      return res.data;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");

    clearAuthHeader();
    Notify.warning("You are logged out!");
  } catch (error) {
    Notify.failure(`${error.message}`);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
