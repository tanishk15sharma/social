import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CreatePostModal } from "./CreatePostModal";
import { Logout } from "./Logout";

const SideNav = () => {
  const { user } = useSelector((state) => state.auth);
  const [togglePostModal, setTogglePostModal] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);

  return (
    <div className="relative">
      <nav className="ml-12 xl:ml-6 sticky top-20 z-10 tablet:hidden mr-6">
        <ul className="m-3    ">
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to="/"
          >
            <li className="flex my-5 text-xl items-center bg-inherit">
              <span className="material-icons mr-4">roofing</span>
              <span>Home</span>
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to="/explore"
          >
            <li className="flex my-5 text-xl items-center bg-inherit">
              <span className="material-icons mr-4">tag</span>
              <span>Explore</span>
            </li>
          </NavLink>
          {/* <li className="flex my-5 text-xl items-center">
          <span className="material-icons mr-4">notifications_none</span>
          <span>Notifications</span>
        </li> */}
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to="/bookmarks"
          >
            <li className="flex  my-5 text-xl items-center bg-inherit">
              <span className="material-icons mr-4">bookmark_border</span>
              <span>Bookmarks</span>
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to={`/profile/${user._id}`}
          >
            <li className="flex my-5 text-xl items-center bg-inherit">
              <span className="material-icons mr-4">person_outline</span>
              <span>Profile</span>
            </li>
          </NavLink>
          <li
            className="flex mt-5 text-xl items-center cursor-pointer bg-inherit"
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
          className="bg-primary-400 w-full p-2 text-white mt-4 hover:shadow-xl block"
        >
          Post
        </button>
        {togglePostModal && (
          <CreatePostModal setTogglePostModal={setTogglePostModal} />
        )}
      </nav>
    </div>
  );
};

export { SideNav };
