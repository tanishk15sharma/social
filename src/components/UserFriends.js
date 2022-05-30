import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserFollowers, getUserFollowing } from "../features/usersSlice";
import dataEmpty from "../assets/nodatapresent.svg";
const UserFriends = ({ user }) => {
  const [showFollowers, setShowFollowers] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFollowers(user._id));
    dispatch(getUserFollowing(user._id));
  }, [user._id]);
  const { userFollowers, userFollowing } = useSelector((state) => state.users);

  return (
    <aside className="m-6 xl:w-4/12 xl:m-0 tablet:w-80 mobile:w-64 small-mobile:hidden xl:mt-6 xl:mr-3 p-2 px-4 bg-primary-100 w-3/12">
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 border-b-4 ${
          showFollowers ? "border-primary-900" : "border-primary-200"
        } `}
        onClick={() => {
          setShowFollowers(!showFollowers);
        }}
      >
        Followers ({userFollowers?.length || 0})
      </button>
      <button
        className={`text-primary-900 w-6/12 font-bold text-center mb-4 border-b-4 ${
          !showFollowers ? "border-primary-900" : "border-primary-200"
        } `}
        onClick={() => setShowFollowers(!showFollowers)}
      >
        Following ({userFollowing?.length || 0})
      </button>
      <div className="flex gap-2 flex-wrap">
        {showFollowers ? (
          userFollowers?.length === 0 ? (
            <img src={dataEmpty} className="m-auto mt-16 w-44" />
          ) : (
            userFollowers?.map((friend) => (
              <div
                className="flex flex-col flex-wrap justify-center"
                key={friend._id}
              >
                <Link to={`/profile/${friend._id}`}>
                  <div className="w-24 h-24 xl:w-20 xl:h-20 bg-primary-200 rounded-full overflow-hidden flex  justify-center items-center font-bold text-primary-900 text-4xl">
                    {friend.profileImage ? (
                      <img
                        src={friend.profileImage}
                        alt="profile"
                        className="object-cover h-full"
                      />
                    ) : (
                      friend.name && friend.name[0].toUpperCase()
                    )}
                  </div>
                  <span className="text-center text-xs font-semibold">
                    {friend.name}
                  </span>
                </Link>
              </div>
            ))
          )
        ) : userFollowing?.length === 0 ? (
          <img src={dataEmpty} className="m-auto mt-16 w-44" />
        ) : (
          userFollowing?.map((friend) => (
            <div
              className="flex flex-col flex-wrap justify-center"
              key={friend._id}
            >
              <Link to={`/profile/${friend._id}`}>
                <div className="w-24 h-24 xl:w-20 xl:h-20 bg-primary-200 overflow-hidden rounded-full flex  justify-center items-center font-bold text-primary-900 text-4xl">
                  {friend.profileImage ? (
                    <img
                      src={friend.profileImage}
                      alt="profile"
                      className="object-cover h-full"
                    />
                  ) : (
                    friend.name && friend.name[0].toUpperCase()
                  )}
                </div>
                <span className="text-center text-xs font-semibold">
                  {friend.name}
                </span>
              </Link>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export { UserFriends };
