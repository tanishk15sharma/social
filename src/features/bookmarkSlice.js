import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserTokenFromLocalStorage } from "./authSlice";

const getAllBookmarks = createAsyncThunk("bookmarks/allBookmarks", async () => {
  try {
    const token = getUserTokenFromLocalStorage();
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/bookmarks`,
      {
        headers: {
          token,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});
const addRemoveBookmark = createAsyncThunk(
  "bookmarks/addRemovePost",
  async (postId) => {
    try {
      const token = getUserTokenFromLocalStorage();

      const { data, status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/bookmark/${postId}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);
const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    loading: false,
    bookmarks: [],
  },
  reducers: {},
  extraReducers: {
    [addRemoveBookmark.pending]: (state, action) => {
      state.loading = true;
    },
    [addRemoveBookmark.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addRemoveBookmark.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default bookmarksSlice.reducer;
export { getAllBookmarks, addRemoveBookmark };
