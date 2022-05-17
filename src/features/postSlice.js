import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getUserAllPosts } from "../utils/posts";

const allPosts = createAsyncThunk("posts/allposts", async () => {
  const allPosts = await getAllPosts();
  //   console.log(allPosts);
  return allPosts;
});
const userAllPosts = createAsyncThunk("posts/allposts", async (userId) => {
  const alluserPosts = await getUserAllPosts(userId);
  console.log(alluserPosts);
});
const postsSlice = createSlice({
  name: "allposts",
  initialState: {
    status: "",
    allPosts: [],
  },
  reducers: {},
  extraReducers: {
    [allPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [allPosts.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.allPosts = payload;
      state.status = "";
    },
  },
});

export default postsSlice.reducer;
export { allPosts, userAllPosts };
