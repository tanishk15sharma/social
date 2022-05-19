import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserTokenFromLocalStorage } from "./authSlice";

const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const token = getUserTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/allUsers`,
      {
        headers: {
          token,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

const getUserFollowing = createAsyncThunk("user/following", async (userId) => {
  if (userId) {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/myFollowing/${userId}`
      );

      if (status === 200) {
        return data.followingList;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
});

const getUserFollowers = createAsyncThunk("user/followers", async (userId) => {
  if (userId) {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/myFollowers/${userId}`
      );

      if (status === 200) {
        return data.followersList;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
});

const initialState = {
  allUsers: [],
  userFollowing: [],
  userFollowers: [],
  loading: false,
  getFriendsLoading: false,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
    },
    [getAllUsers.rejected]: (state, { error }) => {
      state.loading = false;
      console.log(error.message);
    },
    [getUserFollowers.pending]: (state, action) => {
      state.getFriendsLoading = true;
    },
    [getUserFollowers.fulfilled]: (state, { payload }) => {
      state.getFriendsLoading = false;
      state.userFollowers = payload;
    },
    [getUserFollowers.rejected]: (state, { error }) => {
      state.getFriendsLoading = true;
    },
    [getUserFollowing.pending]: (state, action) => {
      state.getFriendsLoading = true;
    },
    [getUserFollowing.fulfilled]: (state, { payload }) => {
      state.getFriendsLoading = false;
      state.userFollowing = payload;
    },
    [getUserFollowing.rejected]: (state, { error }) => {
      state.getFriendsLoading = true;
    },
  },
});

export default usersSlice.reducer;
export { getAllUsers, getUserFollowers, getUserFollowing };
