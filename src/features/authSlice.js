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
    console.log(username, password);
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      console.log(response);
      // if (response.status === 200) {
      //   console.log(response);
      //   return response.data;
      // }
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
      console.log(data);
      if (status === 201) {
        return data;
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
      console.log(payload);
      // state.username = payload.foundUser.username;
      // state.firstname = payload.foundUser.firstName;
      // state.lastname = payload.foundUser.lastName;
      // state.bookmarks = payload.foundUser.bookmarks;
      // state.followers = payload.foundUser.followers;
      // state.following = payload.foundUser.following;
      // localStorage?.setItem("userToken", payload.encodedToken);
    },
    [postLoginDetails.rejected]: (state, { error }) => {
      console.log("error,try again");
      console.log(error.message);
    },
    [postSignupDetails.pending]: () => {
      console.log("pending");
    },
    [postSignupDetails.fulfilled]: (state, { payload }) => {
      state.username = payload.user.username;
      state.name = payload.user.name;
      state.bio = payload.user.bio;
      state.profileImage = payload.user.profileImage;
      state.profileCover = payload.user.profileCover;
      // state.bookmark = payload.user.bookmarks;
      state.followers = payload.user.followers;
      state.following = payload.user.following;
      localStorage?.setItem("userToken", payload.token);
    },
    [postSignupDetails.rejected]: (state, { error }) => {
      console.log(error.message);
    },
  },
});

export { getUserTokenFromLocalStorage, postLoginDetails, postSignupDetails };
export default authSlice.reducer;
