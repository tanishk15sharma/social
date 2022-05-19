import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    loading: false,
    bookmarks: [],
  },
  reducers: {},
  extraReducers: {},
});

export default bookmarksSlice.reducer;
