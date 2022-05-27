import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollower } from "../features/authSlice";
import { getAllUsers, removeSuggestion } from "../features/usersSlice";
import { UserInfo } from "./UserInfo";

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
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-7/12 max-h-96 overflow-y-scroll rounded hover:shadow-lg	">
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
          suggestedUsers.map((user) => {
            return (
              <div
                className="mb-1 flex justify-between items-center mb-3"
                key={user._id}
              >
                <UserInfo user={user} />
                <button
                  className="text-primary-700 h-8 border border-primary-700 hover:bg-primary-500 hover:text-white active:bg-primary-600 font-medium leading-5 px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
