import React, { useState } from "react";

import { format } from "timeago.js";
import { Link } from "react-router-dom";

import { likeDislikePost } from "../utils/posts";
import { useSelector } from "react-redux";
import { PostComments } from "./PostComments";
const PostCard = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { auth } = useSelector((state) => state);

  const likeHandler = async () => {
    setLike((likeValue) => (isLiked ? likeValue - 1 : likeValue + 1));
    await likeDislikePost(post._id);
    setIsLiked(!isLiked);
  };
  console.log(post);
  return (
    <main className=" p-4 px-9 shadow rounded-xl mb-5 mt-3">
      <div className="mb-1 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/profile/${post.userId._id}`}>
            <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
              {post.userId.name && post.userId.name[0].toUpperCase()}
            </div>
          </Link>
          <div className="leading-5 ">
            <span>
              {post.userId.name}
              <span className="block text-gray ">
                @{post.userId.username}{" "}
                <span className="text-xs">{format(post.createdAt)} </span>
              </span>
            </span>
          </div>
        </div>
        <div>
          <span className="material-icons-outlined text-grayLight">
            more_vert
          </span>
        </div>
      </div>
      <section>
        <p className="my-1">{post.desc}</p>
        <img src={post.image ? post.image : ""} />
      </section>
      <section className="flex justify-between mt-2 text-grayLight font-thin">
        <div className="flex">
          <button onClick={likeHandler}>
            <span className="material-icons mr-1">favorite_border</span>
          </button>
          {like}
        </div>
        <div className="flex">
          <button
            onClick={() => setShowComments((previousVal) => !previousVal)}
          >
            <span className="material-icons-outlined">mode_comment</span>
          </button>
          {post.comments.length}
        </div>
        <div className="flex">
          <span className="material-icons mr-1">bookmark_border</span>
        </div>
        <div className="flex">
          <span className="material-icons mr-1">share</span>
        </div>
      </section>
      {showComments ? (
        <PostComments comments={post.comments} postId={post._id} />
      ) : null}
    </main>
  );
};

export { PostCard };
