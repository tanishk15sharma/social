import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../features/bookmarkSlice";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import emptyData from "../assets/empty.png";
const BookmarksFeed = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);
  return (
    <main className="m-3 mobile:m-2 mt-6 bg-primary-50 w-full">
      {loading ? (
        <PostSkeleton />
      ) : bookmarks.length === 0 ? (
        <img src={emptyData} alt="empty" />
      ) : (
        bookmarks.map((bookmarkedPost) => (
          <PostCard post={bookmarkedPost} key={bookmarkedPost._id} />
        ))
      )}
    </main>
  );
};

export { BookmarksFeed };
