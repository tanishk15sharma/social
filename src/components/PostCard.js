import React, { useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { deletePost, likeDislikePost } from "../utils/posts";
import { useDispatch, useSelector } from "react-redux";
import { PostComments } from "./PostComments";
import { CreatePostModal } from "./CreatePostModal";
import { removePostFromAllPost } from "../features/postSlice";
import {
  addPostToBookmark,
  addRemoveBookmark,
  removePostFromBookmark,
} from "../features/bookmarkSlice";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookmarks, loading } = useSelector((state) => state.bookmarks);

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [showComments, setShowComments] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [postOptions, setPostOptions] = useState(false);

  const likeHandler = async () => {
    setLike((likeValue) => (isLiked ? likeValue - 1 : likeValue + 1));
    setIsLiked(!isLiked);
    await likeDislikePost(post._id);
  };

  return (
    <main className=" p-4 px-9 border-t border-primary-200 pb-5 pt-3 hover:bg-primary-100  ease-in	duration-150 cursor-pointer	transition-all	">
      <div className="mb-1 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link to={`/profile/${post.userId._id}`}>
            <div className="w-11 h-11 bg-primary-200 overflow-hidden rounded-full flex justify-center items-center font-bold text-primary-900">
              {post.userId.profileImage ? (
                <img
                  src={post.userId.profileImage}
                  alt="profile"
                  className="object-cover h-full"
                />
              ) : (
                post.userId.name && post.userId.name[0].toUpperCase()
              )}
            </div>
          </Link>
          <div className="leading-5 ">
            <span>
              {post.userId.name}
              <span className="block text-gray text-sm">
                @{post.userId.username} <span>{format(post.createdAt)} </span>
              </span>
            </span>
          </div>
        </div>
        <div>
          <span
            className="material-icons-outlined text-grayLight cursor-pointer hover:text-black"
            onClick={() => setPostOptions(!postOptions)}
          >
            more_vert
          </span>
          <div
            className={`flex flex-col items-start p-2 absolute right-2 bg-primary-50 ${
              postOptions ? "block" : "hidden"
            }`}
          >
            <button
              onClick={() => setEditModal(true)}
              disabled={post.userId._id !== user._id}
              className={post.userId._id !== user._id && "opacity-20"}
            >
              EDIT
            </button>

            <button
              onClick={async () => {
                await deletePost(post._id);
                dispatch(removePostFromAllPost(post._id));
              }}
              disabled={post.userId._id !== user._id}
              className={post.userId._id !== user._id && "opacity-20"}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
      <section>
        <p className="my-1">{post.desc}</p>
        <img src={post.image ? post.image : ""} />
      </section>
      <section className="flex justify-between mt-2 text-grayLight font-thin">
        <div className="flex">
          <button onClick={likeHandler}>
            {isLiked ? (
              <span className="material-icons-outlined text-red">favorite</span>
            ) : (
              <span className="material-icons mr-1">favorite_border</span>
            )}
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
          {bookmarks.some(
            (bookmarkedPost) => bookmarkedPost._id === post._id
          ) ? (
            <button
              onClick={() => {
                dispatch(addRemoveBookmark(post._id));
                dispatch(removePostFromBookmark(post._id));
              }}
            >
              <span className="material-icons-outlined text-primary-700">
                bookmark
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(addRemoveBookmark(post._id));
                dispatch(addPostToBookmark(post));
              }}
            >
              <span
                className={`material-icons mr-1  ${
                  loading && "text-primary-700"
                }`}
              >
                bookmark_border
              </span>
            </button>
          )}
        </div>
        <div className="flex">
          <span className="material-icons mr-1">share</span>
        </div>
      </section>
      {showComments && (
        <PostComments comments={post.comments} postId={post._id} />
      )}
      {editModal && (
        <CreatePostModal
          editDetails={post}
          closeModal={() => setEditModal(false)}
        />
      )}
    </main>
  );
};

export { PostCard };
