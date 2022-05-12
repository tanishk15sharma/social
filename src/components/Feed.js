import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPosts } from "../utils/posts";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2MzZjZjMzFlM2M3OTY0Yzc0ZDhlMCIsImlhdCI6MTY1MjM0NjgyNCwiZXhwIjoxNjUyOTUxNjI0fQ.Y5ugapMHgVjT9VgUjf7O31vuZoefJL2zKzZw4mU3ilw";
  useEffect(() => {
    (async () => {
      const allPosts = await getAllPosts(token);
      console.log(allPosts);
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
