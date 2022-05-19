import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../features/bookmarkSlice";
import { PostCard } from "./PostCard";
const BookmarksFeed = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);
  return (
    <main>
      {loading ? (
        <h1>loading</h1>
      ) : (
        bookmarks.map((bookmarkedPost) => (
          <PostCard post={bookmarkedPost} key={bookmarkedPost._id} />
        ))
      )}
    </main>
  );
};

export { BookmarksFeed };
