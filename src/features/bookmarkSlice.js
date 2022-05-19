import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const allBookmarks = createAsyncThunk("bookmarks/allBookmarks", async () => {
  try {
    const res = await getAllBookmarks();
    console.log(res);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

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
export { allBookmarks };
