import React, { useState } from "react";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";
import profileBg from "../assets/bg-wall.jpg";
import { EditModal } from "../components/EditModal";
const Profile = () => {
  const [toggleEditModal, setToggleEditModal] = useState(false);

  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <section className="m-3 w-2/5 mr-8 mt-6  border-solid border ">
          <div className="h-40 border border-solid bg-gradient-to-r from-black to-black relative">
            <div className="w-40 h-40 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 absolute top-1/4 left-5 border-solid border-white border-4 text-4xl">
              T{/* <img src={profileBg} alt="profile-bg" /> */}
            </div>
          </div>
          <div className="text-left mt-10 m-8 ">
            <span className="font-bold text-xl flex items-center">
              Tanishk Sharma
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
                20 <span className="opacity-60 font-normal">followers</span>
              </span>
              <span className="font-medium">
                10 <span className="opacity-60 font-normal"> following</span>
              </span>
            </div>
            <p className="w-10/12 mt-2">
              Hey this is tanishk sharma , doing coding and loving it Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nisi similique,
            </p>
            <a href="google.com" className="text-blue font-normal">
              Tanishksharma.com
            </a>
          </div>
        </section>
        <Suggestions />
      </div>
      {toggleEditModal ? (
        <EditModal setToggleEditModal={setToggleEditModal} />
      ) : null}
    </div>
  );
};

export { Profile };
