import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";
import profileBg from "../assets/bg-wall.jpg";
import { EditModal } from "../components/EditModal";
import { useParams } from "react-router";
import { getUser } from "../utils/user";
import { Feed } from "../components/Feed";
const Profile = () => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [user, setUser] = useState({});
  const paramsUserId = useParams().id;

  useEffect(() => {
    (async () => {
      const newUser = await getUser(paramsUserId);
      setUser(newUser);
    })();
  }, [paramsUserId]);

  console.log(user);
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
            <div className="text-left mt-10 m-8 ">
              <span className="font-bold text-xl flex items-center">
                {user.name}
                <button
                  className="flex cursor-pointer"
                  onClick={() => setToggleEditModal(true)}
                >
                  <span className="material-icons-outlined opacity-60 ml-2">
                    drive_file_rename_outline
                  </span>
                </button>
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
        <Suggestions />
      </div>
      {toggleEditModal ? (
        <EditModal setToggleEditModal={setToggleEditModal} />
      ) : null}
    </div>
  );
};

export { Profile };
