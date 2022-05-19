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

const initialState = {
  allUsers: [],
  loading: false,
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
  },
});

export default usersSlice.reducer;
export { getAllUsers };
