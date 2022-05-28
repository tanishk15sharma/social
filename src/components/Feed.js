import React, { useEffect } from "react";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, userAllPosts } from "../features/postSlice";
import { PostSkeleton } from "./PostSkeleton";
const Feed = ({ userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userId ? dispatch(userAllPosts(userId)) : dispatch(allPosts());
  }, [userId]);
  const allPostsData = useSelector((state) => state.posts);

  return (
    <div className="m-3 mr-8 min-w-[50%]">
      {allPostsData.loading ? (
        <PostSkeleton />
      ) : (
        <main className="bg-primary-50">
          {!userId && <CreatePost />}
          {allPostsData.allPosts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </main>
      )}
    </div>
  );
};

export { Feed };
