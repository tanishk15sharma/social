import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreatePostModal } from "./CreatePostModal";

const BottomNav = () => {
  const { user } = useSelector((state) => state.auth);

  const [togglePostModal, setTogglePostModal] = useState(false);

  return (
    <nav className="fixed bottom-0 w-screen bg-red z-30 hidden tablet:block">
      <ul className="flex justify-evenly bg-primary-200 p-2">
        <Link to="/">
          <li>
            <span className="material-icons mr-4">roofing</span>
          </li>
        </Link>
        <Link to="/explore">
          <li>
            <span className="material-icons mr-4">tag</span>
          </li>
        </Link>
        <button
          className="border-reset main-color"
          onClick={() => setTogglePostModal((val) => !val)}
        >
          <span class="material-icons-outlined">add</span>
        </button>
        <Link to="/bookmarks">
          <li>
            <span className="material-icons mr-4">bookmark_border</span>
          </li>
        </Link>{" "}
        <Link to={`/profile/${user._id}`}>
          <li>
            <span className="material-icons mr-4">person_outline</span>
          </li>
        </Link>{" "}
      </ul>
      {togglePostModal && (
        <CreatePostModal setTogglePostModal={setTogglePostModal} />
      )}
    </nav>
  );
};

export { BottomNav };
