import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserFollowers, getUserFollowing } from "../features/usersSlice";

const UserFriends = ({ user }) => {
  const [showFollowers, setShowFollowers] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFollowers(user._id));
    dispatch(getUserFollowing(user._id));
  }, [user._id]);
  const { userFollowers, userFollowing } = useSelector((state) => state.users);
  console.log(userFollowing);
  console.log(userFollowers);
  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-3/12">
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 border-b-4 ${
          showFollowers ? "border-primary-900" : "border-primary-200"
        } `}
        onClick={() => {
          setShowFollowers(!showFollowers);
        }}
      >
        Followers
      </button>
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 border-b-4 ${
          !showFollowers ? "border-primary-900" : "border-primary-200"
        } `}
        onClick={() => setShowFollowers(!showFollowers)}
      >
        Following
      </button>
      <div className="flex gap-2 flex-wrap">
        {showFollowers
          ? userFollowers?.map((friend) => (
              <div
                className="flex flex-col flex-wrap justify-center"
                key={friend._id}
              >
                <Link to={`/profile/${friend._id}`}>
                  <div className="w-24 h-24 bg-primary-200 rounded-full flex  justify-center items-center font-bold text-primary-900 text-4xl">
                    {friend.name && friend.name[0].toUpperCase()}
                    {/* <img src={profileBg} alt="profile-bg" /> */}
                  </div>
                  <span className="text-center text-xs font-semibold">
                    {friend.name}
                  </span>
                </Link>
              </div>
            ))
          : userFollowing?.map((friend) => (
              <div
                className="flex flex-col flex-wrap justify-center"
                key={friend._id}
              >
                <Link to={`/profile/${friend._id}`}>
                  <div className="w-24 h-24 bg-primary-200 rounded-full flex  justify-center items-center font-bold text-primary-900 text-4xl">
                    {friend.name && friend.name[0].toUpperCase()}
                    {/* <img src={profileBg} alt="profile-bg" /> */}
                  </div>
                  <span className="text-center text-xs font-semibold">
                    {friend.name}
                  </span>
                </Link>
              </div>
            ))}
      </div>
    </aside>
  );
};

export { UserFriends };
