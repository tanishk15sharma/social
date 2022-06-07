import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { EditModal } from "../components/EditModal";
import { useParams } from "react-router";
import { getUser } from "../utils/user";
import { Feed } from "../components/Feed";
import { UserFriends } from "../components/UserFriends";
import { useDispatch, useSelector } from "react-redux";
import { addFollower, removeFollower } from "../features/authSlice";
import {
  addFollowerInList,
  removeFollowerFromList,
} from "../features/usersSlice";
import { BottomNav } from "../components/BottomNav";

const Profile = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [user, setUser] = useState({});
  const paramsUserId = useParams().id;

  useEffect(() => {
    (async () => {
      const newUser = await getUser(paramsUserId);
      setUser(newUser);
    })();
  }, [paramsUserId, toggleEditModal]);

  return (
    <div>
      <Header />
      <div className="flex gap-3 mobile:gap-0">
        <SideNav />
        <BottomNav />
        {user ? (
          <section className="m-3 w-6/12 tablet:w-9/12 mt-6 small-mobile:mt-0 small-mobile:m-2 small-mobile:w-full bg-primary-100  ">
            <div className="h-40  relative">
              <img
                src={
                  user.profileCover
                    ? user.profileCover
                    : "https://img.freepik.com/free-vector/hand-painted-background-violet-orange-colours_23-2148427578.jpg?w=2000"
                }
                alt="cover img"
                className="object-cover h-full w-full"
              />
              <div className="w-40 h-40 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 overflow-hidden absolute top-1/4 left-5 border-solid border-white border-4 text-4xl">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="object-cover h-full"
                  />
                ) : (
                  user.name && user.name[0].toUpperCase()
                )}
              </div>
            </div>
            <div className="text-left   mt-10 m-8 ">
              <span className="font-bold text-xl flex items-center">
                {user.name}
                {loggedUser.user._id === paramsUserId ? (
                  <button
                    className="flex cursor-pointer"
                    onClick={() => setToggleEditModal(true)}
                  >
                    <span className="material-icons-outlined opacity-60 ml-5">
                      drive_file_rename_outline
                    </span>
                  </button>
                ) : loggedUser.user.following?.includes(user._id) ? (
                  <button
                    className="border rounded ease-out duration-200 ml-5 border-primary-800 p-0 pr-5 text-sm pl-5 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md"
                    onClick={() => {
                      dispatch(removeFollower(user._id));
                      dispatch(removeFollowerFromList(loggedUser.user._id));
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="border rounded ease-out duration-200 ml-5 border-primary-800 p-0 pr-5 text-sm pl-5 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-md"
                    onClick={() => {
                      dispatch(addFollower(user._id));
                      dispatch(addFollowerInList(loggedUser));
                    }}
                  >
                    follow
                  </button>
                )}
              </span>
              <div className="mt-4 hidden small-mobile:block">
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
              <a
                href={user.website ? user.website : "https://www.google.com/"}
                className="text-blue font-normal"
                target="_blank"
              >
                {user.website ? user.website : "yourwebsite/"}
              </a>
            </div>
            <div className="w-[98%] overflow-hidden">
              <Feed userId={paramsUserId} />
            </div>
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
