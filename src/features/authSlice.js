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
  async (loginData) => {
    try {
      const { data, status } = await axios.post("/auth/login", loginData);

      if (status === 200) {
        return { data };
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
      const { data, status } = await axios.post("/auth/register", signupData);

      if (status === 201) {
        return data;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: {},
  reducers: {},
  extraReducers: {
    [postLoginDetails.pending]: () => {
      console.log("login pending");
    },
    [postLoginDetails.fulfilled]: (state, { payload }) => {
      console.log(payload.data);
      state = payload.data.data.user;
      // state.username = payload.data.user.username;
      // state.name = payload.data.user.name;
      // state.bio = payload.data.user.bio;
      // state.profileImage = payload.data.user.profileImage;
      // state.profileCover = payload.data.user.profileCover;
      // // state.bookmark = payload.user.bookmarks;
      // state.followers = payload.data.user.followers;
      // state.following = payload.data.user.following;
      localStorage.setItem("userToken", payload.data.token);
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      console.log("login failed ,try again");
      console.log(error.message);
    },
    [postSignupDetails.pending]: () => {
      console.log(" signup pending");
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      state = payload.data;

      // state.username = payload.user.username;
      // state.name = payload.user.name;
      // state.bio = payload.user.bio;
      // state.profileImage = payload.user.profileImage;
      // state.profileCover = payload.user.profileCover;
      // // state.bookmark = payload.user.bookmarks;
      // state.followers = payload.user.followers;
      // state.following = payload.user.following;
      localStorage.setItem("userToken", payload.token);
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      console.log("signup failed ,try again");
      console.log(error.message);
    },
  },
});

export { getUserTokenFromLocalStorage, postLoginDetails, postSignupDetails };
export default authSlice.reducer;
