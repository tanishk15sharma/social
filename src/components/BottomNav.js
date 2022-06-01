import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreatePostModal } from "./CreatePostModal";

const BottomNav = () => {
  const { user } = useSelector((state) => state.auth);

  const [togglePostModal, setTogglePostModal] = useState(false);

  return (
    <nav className="fixed bottom-0 w-screen bg-red z-30 hidden tablet:block">
      <ul className="flex justify-evenly bg-primary-200 p-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons mr-4">roofing</span>
          </li>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons mr-4">tag</span>
          </li>
        </NavLink>
        <button
          className="border-reset main-color"
          onClick={() => setTogglePostModal((val) => !val)}
        >
          <span class="material-icons-outlined">add</span>
        </button>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons mr-4">bookmark_border</span>
          </li>
        </NavLink>{" "}
        <NavLink
          to={`/profile/${user._id}`}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons mr-4">person_outline</span>
          </li>
        </NavLink>{" "}
      </ul>
      {togglePostModal && (
        <CreatePostModal setTogglePostModal={setTogglePostModal} />
      )}
    </nav>
  );
};

export { BottomNav };
