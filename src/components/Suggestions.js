import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollower } from "../features/authSlice";
import { getAllUsers, removeSuggestion } from "../features/usersSlice";
import { UserInfo } from "./UserInfo";
import dataEmpty from "../assets/nodatapresent.svg";
import { UserSkeleton } from "./UserSkeleton";
const Suggestions = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { allUsers, loading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const otherUsers = allUsers.filter(({ _id }) => user._id !== _id);

  const suggestedUsers = otherUsers.filter(({ followers }) =>
    followers.every((id) => user._id !== id)
  );

  return (
    <aside
      className="mt-6 mr-2 min-w-[26%] xl:ml-2 p-2 px-4 bg-primary-100 max-h-80 overflow-y-scroll rounded hover:shadow-lg	 miniLaptop:hidden
    scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-200
    "
    >
      <h2 className="font-bold text-primary-600 ml-3 mb-2 uppercase">
        <span className="border-b-4 rounded border-primary-800">
          Suggestions
        </span>{" "}
        for you{" "}
      </h2>
      <div>
        {loading ? (
          <UserSkeleton />
        ) : suggestedUsers.length === 0 ? (
          <img src={dataEmpty} className="m-auto mt-16 w-44" />
        ) : (
          suggestedUsers.map((user) => {
            return (
              <div
                className="mb-1 flex justify-between items-center mb-3"
                key={user._id}
              >
                <UserInfo user={user} />
                <button
                  className="text-primary-700 h-8 border border-primary-700 hover:bg-primary-500 hover:text-white active:bg-primary-600 font-medium leading-5 px-4 lg:px-2 lg:text-[12px] py-1 rounded outline-none focus:outline-none mr-1 mb-1 xl:mr-0 mb-0 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    dispatch(addFollower(user._id));
                    dispatch(removeSuggestion(user._id));
                  }}
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
