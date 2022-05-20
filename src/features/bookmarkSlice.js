import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserTokenFromLocalStorage } from "./authSlice";

const getAllBookmarks = createAsyncThunk("bookmarks/allBookmarks", async () => {
  try {
    const token = getUserTokenFromLocalStorage();
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/bookmarks`,
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
  reducers: {
    removePostFromBookmark: (state, { payload }) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmarkedPost) => bookmarkedPost._id !== payload
      );
    },
    addPostToBookmark: (state, { payload }) => {
      state.bookmarks.push(payload);
    },
  },
  extraReducers: {
    [addRemoveBookmark.pending]: (state, action) => {
      state.loading = true;
    },
    [addRemoveBookmark.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addRemoveBookmark.rejected]: (state, { error }) => {
      state.loading = false;
      console.log(error.message);
    },
    [getAllBookmarks.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBookmarks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookmarks = payload.bookmarks.bookmarks;
    },
    [getAllBookmarks.rejected]: (state, { error }) => {
      state.loading = false;
      console.log(error.message);
    },
  },
});

export default bookmarksSlice.reducer;
export { getAllBookmarks, addRemoveBookmark };
export const { removePostFromBookmark, addPostToBookmark } =
  bookmarksSlice.actions;
