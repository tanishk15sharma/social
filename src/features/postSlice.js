import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getUserAllPosts } from "../utils/posts";

const allPosts = createAsyncThunk("posts/allposts", async () => {
  const allPosts = await getAllPosts();
  return allPosts;
});
const userAllPosts = createAsyncThunk("posts/allposts", async (userId) => {
  const alluserPosts = await getUserAllPosts(userId);
  return alluserPosts;
});
const postsSlice = createSlice({
  name: "allposts",
  initialState: {
    loading: false,
    allPosts: [],
  },
  reducers: {},
  extraReducers: {
    [allPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [allPosts.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.allPosts = payload;
      state.loading = false;
    },
  },
});

export default postsSlice.reducer;
export { allPosts, userAllPosts };
