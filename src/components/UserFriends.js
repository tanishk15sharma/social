import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFriends } from "../utils/user";
const UserFriends = ({ user }) => {
  const [myFriendList, setMyFriendList] = useState([]);

  useEffect(() => {
    (async () => {
      const friendList = await getUserFriends(user._id);
      setMyFriendList(friendList);
    })();
  }, [user._id]);

  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-3/12">
      <h2 className="text-primary-900 font-bold text-center mb-4 border">
        Friends
      </h2>
      <div className="flex gap-2 flex-wrap">
        {myFriendList?.map((friend) => (
          <div className="flex flex-col flex-wrap" key={friend._id}>
            <Link to={`/profile/${friend._id}`}>
              <div className="w-24 h-24 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 text-4xl">
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
