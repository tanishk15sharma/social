import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getUserAllPosts } from "../utils/posts";

const allPosts = createAsyncThunk("posts/allposts", async () => {
  const allPosts = await getAllPosts();
  return allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});
const userAllPosts = createAsyncThunk("posts/allUserposts", async (userId) => {
  const posts = await getUserAllPosts(userId);
  return posts;
});
const postsSlice = createSlice({
  name: "allposts",
  initialState: {
    loading: false,
    allPosts: [],
    sortBy: "Latest",
  },
  reducers: {
    addPosts: (state, { payload }) => {
      state.allPosts = [payload, ...state.allPosts];
    },
    removePostFromAllPost: (state, { payload }) => {
      state.allPosts = state.allPosts.filter((post) => post._id !== payload);
    },
    editPosts: (state, { payload }) => {
      state.allPosts.forEach((post, index) =>
        post._id === payload._id ? (state.allPosts[index] = payload) : ""
      );
    },
    sortByLatest: (state) => {
      state.allPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      state.sortBy = "Latest";
    },
    sortByOldest: (state) => {
      state.allPosts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      state.sortBy = "Oldest";
    },
  },
  extraReducers: {
    [allPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [allPosts.fulfilled]: (state, { payload }) => {
      state.allPosts = payload;
      state.loading = false;
    },
    [userAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [userAllPosts.fulfilled]: (state, { payload }) => {
      state.allPosts = payload;
      state.loading = false;
    },
  },
});

export const {
  addPosts,
  removePostFromAllPost,
  editPosts,
  sortByLatest,
  sortByOldest,
} = postsSlice.actions;
export default postsSlice.reducer;
export { allPosts, userAllPosts };
