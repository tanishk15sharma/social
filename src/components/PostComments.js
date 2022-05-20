import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addComment } from "../utils/posts";

const PostComments = ({ comments, postId }) => {
  const { user } = useSelector((state) => state.auth);

  const [allComments, setAllComments] = useState(comments);
  const [commentData, setCommentData] = useState({
    comment: "",
    name: user.name,
    profileImage: user.profileImage,
  });
  console.log(allComments);
  const addBtnHandler = () => {
    if (commentData.comment === "") {
      return alert("please write a comment");
    }
    addComment(commentData, postId);
    setAllComments((previousComments) => [...previousComments, commentData]);
    setCommentData({ ...commentData, comment: "" });
  };
  return (
    <div>
      <div className="flex  ml-4 ">
        <div className="w-7 h-7 bg-primary-200 rounded-full flex justify-center mr-4 items-center font-bold text-primary-900">
          {user.name && user.name[0].toUpperCase()}
        </div>
        <input
          placeholder="write a comment"
          className="focus:outline-none border-solid border w-full"
          onChange={(e) =>
            setCommentData({ ...commentData, comment: e.target.value })
          }
          value={commentData.comment}
        />
        <button
          className="text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
          type="button"
          onClick={addBtnHandler}
        >
          Add
        </button>
      </div>
      {allComments.map(({ comment, name }) => (
        <div className="flex items-center ml-4 mb-2 mt-2" key={name}>
          <div className="w-7 h-7 bg-primary-200 rounded-full flex justify-center mr-4 items-center font-bold text-primary-900">
            {name[0].toUpperCase()}
          </div>
          <div className="flex flex-col ">
            <span className="text-sm">{name}</span>
            <p className="text-sm">{comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { PostComments };
