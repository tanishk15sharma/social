import React, { useEffect } from "react";
import { PostCard } from "./PostCard";
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
    <div className="m-3 mt-6 w-full ">
      {allPostsData.loading ? (
        <PostSkeleton />
      ) : (
        <main className="bg-primary-50">
          {allPostsData.allPosts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </main>
      )}
    </div>
  );
};

export { Feed };
