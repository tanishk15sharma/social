import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../features/usersSlice";

const Suggestions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { allUsers, loading } = useSelector((state) => state.users);
  console.log(allUsers);
  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-7/12 max-h-96 overflow-y-scroll rounded">
      <h2 className="font-bold text-primary-600 ml-3 mb-2 uppercase">
        <span className="border-b-4 rounded border-primary-800">
          Suggestions
        </span>{" "}
        for you{" "}
      </h2>
      <div>
        {loading ? (
          <h1>loading</h1>
        ) : (
          allUsers.map((user) => {
            return (
              <div
                className="mb-1 flex justify-between items-center mb-3"
                key={user._id}
              >
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
                <button
                  class="text-primary-700 h-8 border border-primary-700 hover:bg-primary-500 hover:text-white active:bg-primary-600 font-medium leading-5 px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Follow
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export { Suggestions };
