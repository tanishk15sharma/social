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
    <div className="w-full m-3 mobile:m-2 mt-6">
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
