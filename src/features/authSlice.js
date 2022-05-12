import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getUserTokenFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userToken") || {
    token: null,
  };
  return userDetails;
};

const postLoginDetails = createAsyncThunk(
  "login/userDetails",
  async ({ username, password }) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

const postSignupDetails = createAsyncThunk(
  "signup/userDetails",
  async (signupData) => {
    try {
      const response = await axios.post("/api/auth/signup", signupData);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

const initialState = {
  username: "",
  name: "",
  bio: "",
  profileImage: "",
  profileCover: "",
  bookmarks: [],
  followers: [],
  following: [],
};
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: {
    [postLoginDetails.pending]: () => {
      console.log("pending");
    },
    [postLoginDetails.fulfilled]: (state, { payload }) => {
      state.token = payload.encodedToken;
      state.username = payload.foundUser.username;
      state.firstname = payload.foundUser.firstName;
      state.lastname = payload.foundUser.lastName;
      state.bookmarks = payload.foundUser.bookmarks;
      state.followers = payload.foundUser.followers;
      state.following = payload.foundUser.following;
      localStorage?.setItem("userToken", payload.encodedToken);
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      console.log("error,try again");
      console.log(error.message);
    },
    [postSignupDetails.pending]: () => {
      console.log("pending");
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      state.token = payload.encodedToken;
      state.username = payload.createdUser.username;
      state.firstname = payload.createdUser.firstName;
      state.lastname = payload.createdUser.lastName;
      state.bookmarks = payload.createdUser.bookmarks;
      state.followers = payload.createdUser.followers;
      state.following = payload.createdUser.following;
      localStorage?.setItem("userToken", payload.encodedToken);
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      console.log("error,try again");
      console.log(error.message);
    },
  },
});

export { getUserTokenFromLocalStorage, postLoginDetails, postSignupDetails };
export default authSlice.reducer;
