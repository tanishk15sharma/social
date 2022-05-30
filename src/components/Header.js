import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchUsers } from "./SearchUsers";

const Header = () => {
  const loggedUser = useSelector((state) => state.auth);

  return (
    <header className="flex justify-between items-end bg-primary-100 p-2 sticky top-0 z-20">
      <div className="flex items-center mx-12 xl:ml-6">
        <span className="material-icons text-4xl ">flutter_dash</span>

        <SearchUsers />
      </div>
      <Link to={`/profile/${loggedUser.user._id}`}>
        <div className="w-9 h-9 hidden tablet:block mr-6 bg-primary-200 overflow-hidden rounded-full flex justify-center items-center font-bold text-primary-900">
          {loggedUser.user.profileImage ? (
            <img
              src={loggedUser.user.profileImage}
              alt="profile"
              className="object-cover h-full"
            />
          ) : (
            loggedUser.user.name && loggedUser.user.name[0].toUpperCase()
          )}
        </div>
      </Link>
    </header>
  );
};

export { Header };
