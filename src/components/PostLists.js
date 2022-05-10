import React from "react";
import { PostCard } from "./PostCard";

const PostLists = () => {
  return (
    <div className="m-3 w-2/5 mr-8">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export { PostLists };
