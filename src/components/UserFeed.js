import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../features/postSlice";
import { PostSkeleton } from "./PostSkeleton";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
const UserFeed = () => {
  const dispatch = useDispatch();
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
    <div className="m-3 mr-8 min-w-[50%]">
      {allPostsData.loading ? (
        <PostSkeleton />
      ) : (
        <main className="bg-primary-50">
          <CreatePost />
          {userFeed?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </main>
      )}
    </div>
  );
};

export default UserFeed;
