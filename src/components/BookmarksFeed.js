import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../features/bookmarkSlice";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
const BookmarksFeed = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);
  return (
    <main className="m-3 bg-primary-50 min-w-[50%]">
      {loading ? (
        <PostSkeleton />
      ) : (
        bookmarks.map((bookmarkedPost) => (
          <PostCard post={bookmarkedPost} key={bookmarkedPost._id} />
        ))
      )}
    </main>
  );
};

export { BookmarksFeed };
