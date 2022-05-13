import React, { useState, useEffect } from "react";
import { getUser } from "../utils/user";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";
import { likeDislikePost } from "../utils/posts";
const PostCard = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (async () => {
      const newUser = await getUser(post.userId);
      setUser(newUser);
    })();
  }, [post.userId]);

  const likeHandler = async () => {
    await likeDislikePost(post._id);
    setLike((likeValue) => (isLiked ? likeValue - 1 : likeValue + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className=" p-4 px-9 shadow-xl rounded-xl mb-5 mt-3">
      <div className="mb-1 flex  items-center">
        <Link to={`/profile/${post.userId}`}>
          <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
            {user.name && user.name[0].toUpperCase()}
          </div>
        </Link>
        <div className="leading-5 ">
          <span>
            {user.name}
            <span className="block text-gray">
              @{user.username} {format(post.createdAt)}{" "}
            </span>
          </span>
        </div>
      </div>
      <p className="my-1">{post.desc}</p>
      <div className="flex justify-between mt-2 text-grayLight font-thin">
        <div className="flex">
          <button onClick={likeHandler}>
            <span className="material-icons mr-1">favorite_border</span>
          </button>
          {like}
        </div>
        <div className="flex">
          <span className="material-icons-outlined">mode_comment</span>
          {post.comments.length}
        </div>
        <div className="flex">
          <span className="material-icons mr-1">bookmark_border</span>
        </div>
        <div className="flex">
          <span className="material-icons mr-1">share</span>
        </div>
      </div>
    </div>
  );
};

export { PostCard };
