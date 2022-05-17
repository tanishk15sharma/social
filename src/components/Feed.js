import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPosts, getUserAllPosts } from "../utils/posts";
import { CreatePost } from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, userAllPosts } from "../features/postSlice";
const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    userId ? dispatch(userAllPosts(userId)) : dispatch(allPosts());
  }, [userId]);
  const allPosts = useSelector((state) => state);
  console.log(allPosts);
  return (
    <div className="m-3  mr-8">
      {!userId && <CreatePost setPosts={setPosts} />}
      {posts?.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export { Feed };
