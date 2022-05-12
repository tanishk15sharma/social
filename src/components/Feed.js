import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPosts } from "../utils/posts";
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    })();
  }, []);

  return (
    <div className="m-3 w-2/5 mr-8">
      {posts?.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export { Feed };
