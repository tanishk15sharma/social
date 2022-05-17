import React, { useEffect } from "react";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, userAllPosts } from "../features/postSlice";
const Feed = ({ userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userId ? dispatch(userAllPosts(userId)) : dispatch(allPosts());
  }, [userId]);
  const allPostsData = useSelector((state) => state.posts);

  return (
    <div className="m-3  mr-8">
      {allPostsData.loading ? (
        <h1>loading</h1>
      ) : (
        <>
          {!userId && <CreatePost />}
          {allPostsData.allPosts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </>
      )}
    </div>
  );
};

export { Feed };
