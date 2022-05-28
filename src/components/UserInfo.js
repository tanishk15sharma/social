import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`}>
      <div className="flex p-2 items-center">
        <div className="w-9 h-9 bg-primary-200 overflow-hidden rounded-full flex justify-center items-center font-bold text-primary-900 mr-1">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="profile"
              className="object-cover h-full"
            />
          ) : (
            user.name && user.name[0].toUpperCase()
          )}
        </div>
        <div className="leading-4">
          <span>
            {user.name}
            <span className="block text-gray ">@{user.username}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export { UserInfo };
