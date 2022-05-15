import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPosts, getUserAllPosts } from "../utils/posts";
import { CreatePost } from "./CreatePost";
const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const allPosts = userId
        ? await getUserAllPosts(userId)
        : await getAllPosts();
      setPosts(allPosts);
    })();
  }, [userId]);

  return (
    <div className="m-3  mr-8">
      <CreatePost setPosts={setPosts} />
      {posts?.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export { Feed };
