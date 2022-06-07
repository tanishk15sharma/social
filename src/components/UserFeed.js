import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, sortByLatest, sortByOldest } from "../features/postSlice";
import { PostSkeleton } from "./PostSkeleton";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import emptyData from "../assets/empty.png";

const UserFeed = () => {
  const dispatch = useDispatch();
  const [sortOptions, setSortOptions] = useState(false);
  const loggedUser = useSelector((state) => state.auth);
  const allPostsData = useSelector((state) => state.posts);
  const userFeed = allPostsData.allPosts?.filter(
    (post) =>
      loggedUser.user.following?.includes(post.userId._id) ||
      loggedUser.user._id === post.userId._id
  );
  useEffect(() => {
    dispatch(allPosts());
  }, []);

  return (
    <div className="m-3 mobile:m-2 mt-6 w-full">
      {allPostsData.loading ? (
        <PostSkeleton />
      ) : (
        <main className="bg-primary-50">
          <CreatePost />
          <div className="bg-white p-4 relative">
            <div className="h1 border border-grayLight "></div>

            <button
              className="absolute right-4 top-1 pl-2 bg-white flex"
              onClick={() => setSortOptions(!sortOptions)}
            >
              Sort By:{" "}
              {sortOptions ? (
                <span className="material-icons-outlined">arrow_drop_up</span>
              ) : (
                <span className="material-icons-outlined">arrow_drop_down</span>
              )}
            </button>
            {sortOptions && (
              <div className="flex flex-col  w-40 p-2 drop-shadow-lg absolute right-4 top-8 z-30 bg-primary-100">
                <button
                  className={`text-grayLight text-left p-2 ${
                    allPostsData.sortBy === "Latest"
                      ? "bg-primary-200 text-black"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(sortByLatest());
                    setSortOptions(false);
                  }}
                >
                  Latest
                </button>
                <button
                  className={`text-grayLight text-left p-2 ${
                    allPostsData.sortBy === "Oldest"
                      ? "bg-primary-200 text-black"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(sortByOldest());
                    setSortOptions(false);
                  }}
                >
                  Oldest
                </button>
              </div>
            )}
          </div>
          {userFeed.length === 0 ? (
            <img src={emptyData} alt="empty" />
          ) : (
            userFeed?.map((post) => <PostCard post={post} key={post._id} />)
          )}
        </main>
      )}
    </div>
  );
};

export default UserFeed;
