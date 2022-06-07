import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreatePostModal } from "./CreatePostModal";
import { logoutUser } from "../utils/user";

const BottomNav = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
            <span className="material-icons ">roofing</span>
          </li>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons ">tag</span>
          </li>
        </NavLink>
        <button
          className="border-reset main-color"
          onClick={() => setTogglePostModal((val) => !val)}
        >
          <span className="material-icons-outlined">add</span>
        </button>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            isActive ? "border-b-4 border-primary-500" : ""
          }
        >
          <li>
            <span className="material-icons ">bookmark_border</span>
          </li>
        </NavLink>{" "}
        <button onClick={() => logoutUser(navigate)}>
          <span className="material-icons-outlined">logout</span>
        </button>
      </ul>
      {togglePostModal && (
        <CreatePostModal setTogglePostModal={setTogglePostModal} />
      )}
    </nav>
  );
};

export { BottomNav };
