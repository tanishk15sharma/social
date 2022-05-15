import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFollowing, getUserFollowers } from "../utils/user";
const UserFriends = ({ user }) => {
  const [showFriends, setShowFriends] = useState(true);
  const [myFollowingList, setMyFollowingList] = useState([]);
  const [myFollowersList, setMyFollowersList] = useState([]);
  useEffect(() => {
    (async () => {
      const followersList = await getUserFollowers(user._id);
      setMyFollowersList(followersList);
      const followingList = await getUserFollowing(user._id);
      setMyFollowingList(followingList);
    })();
  }, [user._id]);

  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-3/12">
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 ${
          showFriends ? "border-4" : "border"
        } `}
        onClick={() => {
          setShowFriends(!showFriends);
        }}
      >
        Followers
      </button>
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 ${
          !showFriends ? "border-4" : "border"
        } `}
        onClick={() => setShowFriends(!showFriends)}
      >
        Following
      </button>
      <div className="flex gap-2 flex-wrap">
        {showFriends
          ? myFollowersList?.map((friend) => (
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
          : myFollowingList?.map((friend) => (
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
