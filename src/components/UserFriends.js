import React, { useState, useEffect } from "react";
const UserFriends = ({ user }) => {
  const [myFriendList, setMyFriendList] = useState([]);

  useEffect(() => {
    (async () => {
      const friendList = await getUserFriends(user._id);
      setMyFriendList(friendList);
    })();
  }, user._id);
  console.log(myFriendList);
  return (
    <aside className="m-6 ml-6 p-2 px-4 bg-primary-100 w-3/12">
      <h2 className="text-primary-900 font-bold text-center mb-4 border">
        Friends
      </h2>
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col flex-wrap">
          <div className="w-24 h-24 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 text-4xl">
            T{/* <img src={profileBg} alt="profile-bg" /> */}
          </div>
          <span className="text-center text-xs font-semibold">
            Tanishk Sharma
          </span>
        </div>
        <div className="w-24 h-24 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 text-4xl">
          T{/* <img src={profileBg} alt="profile-bg" /> */}
        </div>
        <div className="w-24 h-24 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 text-4xl">
          T{/* <img src={profileBg} alt="profile-bg" /> */}
        </div>{" "}
        <div className="w-24 h-24 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 text-4xl">
          T{/* <img src={profileBg} alt="profile-bg" /> */}
        </div>
      </div>
    </aside>
  );
};

export { UserFriends };
