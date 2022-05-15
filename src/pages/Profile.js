import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { EditModal } from "../components/EditModal";
import { useParams } from "react-router";
import { getUser } from "../utils/user";
import { Feed } from "../components/Feed";
import { UserFriends } from "../components/UserFriends";
import axios from "axios";
import { getUserTokenFromLocalStorage } from "../features/authSlice";
const Profile = () => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [user, setUser] = useState({});
  const paramsUserId = useParams().id;
  const [isUser, setIsUser] = useState(false);
  const [followed, setFollowed] = useState(true);
  useEffect(() => {
    (async () => {
      const newUser = await getUser(paramsUserId);
      setUser(newUser);
    })();
  }, [paramsUserId]);

  const handleClick = async () => {
    console.log("clicked");
    const token = getUserTokenFromLocalStorage();
    try {
      if (followed) {
        await axios.put(
          `/users/follow/${user._id}`,
          {},
          {
            headers: {
              token,
            },
          }
        );
      } else {
        await axios.put(
          `/users/unfollow/${user._id}`,
          {},
          {
            headers: {
              token,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        {user ? (
          <section className="m-3 w-2/5 mr-8 mt-6  border-solid border ">
            <div className="h-40 border border-solid bg-gradient-to-r from-black to-black relative">
              <div className="w-40 h-40 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 absolute top-1/4 left-5 border-solid border-white border-4 text-4xl">
                {user.name && user.name[0].toUpperCase()}
                {/* <img src={profileBg} alt="profile-bg" /> */}
              </div>
            </div>
            <div className="text-left   mt-10 m-8 ">
              <span className="font-bold text-xl flex items-center">
                {user.name}
                {isUser ? (
                  <button
                    className="flex cursor-pointer"
                    onClick={() => setToggleEditModal(true)}
                  >
                    <span className="material-icons-outlined opacity-60 ml-5">
                      drive_file_rename_outline
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    className="border rounded ease-out duration-200 ml-5 border-primary-800 p-0 pr-5 text-sm pl-5 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md"
                  >
                    {followed ? "Unfollow" : "Follow"}
                  </button>
                )}
              </span>
              <div className="mt-4">
                <span className="font-medium mr-4">
                  {user.followers ? user.followers.length : 0}{" "}
                  <span className="opacity-60 font-normal">followers</span>
                </span>
                <span className="font-medium">
                  {user.following ? user.following.length : 0}{" "}
                  <span className="opacity-60 font-normal"> following</span>
                </span>
              </div>
              <p className="w-10/12 mt-2">{user.bio}</p>
              <a href="google.com" className="text-blue font-normal">
                Tanishksharma.com
              </a>
            </div>
            <Feed userId={paramsUserId} />
          </section>
        ) : (
          <h2>loading</h2>
        )}
        <UserFriends user={user} />
      </div>
      {toggleEditModal ? (
        <EditModal setToggleEditModal={setToggleEditModal} />
      ) : null}
    </div>
  );
};

export { Profile };
