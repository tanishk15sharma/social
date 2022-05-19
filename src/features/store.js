import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import postsReducer from "./postSlice";
import bookmarksReducer from "./bookmarkSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
  },
});
export { store };
