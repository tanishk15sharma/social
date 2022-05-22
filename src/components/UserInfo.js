import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  return (
    <div className="flex p-2 items-center">
      <Link to={`/profile/${user._id}`}>
        <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 mr-1">
          {user.name && user.name[0].toUpperCase()}
        </div>
      </Link>
      <div className="leading-4">
        <span>
          {user.name}
          <span className="block text-gray ">@{user.username}</span>
        </span>
      </div>
    </div>
  );
};

export { UserInfo };
