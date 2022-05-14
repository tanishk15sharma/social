import React, { useState, useEffect } from "react";
import { getUser } from "../utils/user";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { likeDislikePost } from "../utils/posts";
import { useSelector } from "react-redux";
const PostCard = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      const currentUser = await getUser(post.userId);
      setUser(currentUser);
    })();
  }, [post.userId]);

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(auth.id));
  // }, []);

  const likeHandler = async () => {
    await likeDislikePost(post._id);
    setLike((likeValue) => (isLiked ? likeValue - 1 : likeValue + 1));
    setIsLiked(!isLiked);
  };

  return (
    <main className=" p-4 px-9 shadow-xl rounded-xl mb-5 mt-3">
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
          <span className="material-icons-outlined">mode_comment</span>
          {post.comments.length}
        </div>
        <div className="flex">
          <span className="material-icons mr-1">bookmark_border</span>
        </div>
        <div className="flex">
          <span className="material-icons mr-1">share</span>
        </div>
      </section>
    </main>
  );
};

export { PostCard };
