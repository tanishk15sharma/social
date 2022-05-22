import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CreatePostModal } from "./CreatePostModal";
import { Logout } from "./Logout";

const SideNav = () => {
  const { user } = useSelector((state) => state.auth);
  const [togglePostModal, setTogglePostModal] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);
  return (
    <div className="ml-12 sticky top-20 z-10 w-1/5">
      <ul className="m-3">
        <Link to="/">
          <li className="flex my-5 text-xl items-center">
            <span className="material-icons mr-4">roofing</span>
            <span>Home</span>
          </li>
        </Link>
        <li className="flex my-5 text-xl items-center">
          <span className="material-icons mr-4">tag</span>
          <span>Explore</span>
        </li>
        <li className="flex my-5 text-xl items-center">
          <span className="material-icons mr-4">notifications_none</span>
          <span>Notifications</span>
        </li>
        <Link to="/bookmarks">
          <li className="flex  my-5 text-xl items-center">
            <span className="material-icons mr-4">bookmark_border</span>
            <span>Bookmarks</span>
          </li>
        </Link>
        <Link to={`/profile/${user._id}`}>
          <li className="flex my-5 text-xl items-center">
            <span className="material-icons mr-4">person_outline</span>
            <span>Profile</span>
          </li>
        </Link>
        <li
          className="flex mt-5 text-xl items-center cursor-pointer"
          onClick={() => setToggleLogout((preVal) => !preVal)}
        >
          <span className="material-icons mr-4">tune</span>
          <span>Settings</span>
        </li>
        {toggleLogout && <Logout setLogout={setToggleLogout} />}
      </ul>
      <button
        type="button"
        onClick={() => setTogglePostModal(!togglePostModal)}
        className="text-white text-center w-100 bg-gradient-to-br from-primary-500 to-primary-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-md  dark:focus:ring-primary-800 font-medium rounded  text-xl  px-5 py-2.5 text-center mr-2 mb-2"
      >
        Post
      </button>
      {togglePostModal && (
        <CreatePostModal setTogglePostModal={setTogglePostModal} />
      )}
    </div>
  );
};

export { SideNav };
