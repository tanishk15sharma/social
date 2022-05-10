import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUsers = createAsyncThunk("get/users", async () => {
  try {
    const response = await axios.get("/api/users");
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

const initialState = {
  usersArr: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: () => {
      console.log("pending");
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      console.log(state, payload);
      state.usersArr = payload.users;
    },
    [getUsers.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export default usersSlice.reducer;
export { getUsers };
