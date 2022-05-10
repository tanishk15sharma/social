import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUsers } from "../features/usersSlice";

const Suggestions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUsers());
  }, []);
  const allUsers = useSelector((state) => state.users.usersArr);
  console.log(allUsers);
  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-3/12">
      <h2 className="font-bold text-primary-800">Suggestions for you </h2>
      <div className=" ">
        {allUsers.map((user) => {
          return (
            <div
              className="mb-1 flex justify-between items-center mb-3"
              key={user._id}
            >
              <div className="flex p-2 items-center">
                <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 mr-1">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="leading-4">
                  <span>
                    {user.firstName} {user.lastName}
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
        })}
      </div>
    </aside>
  );
};

export { Suggestions };
