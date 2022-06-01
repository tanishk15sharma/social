import React, { useState } from "react";
import { useSelector } from "react-redux";

import { uploadImage } from "../utils/posts";
import { deleteUser, getUpdateUser } from "../utils/user";

const EditModal = ({ setToggleEditModal }) => {
  const { user } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    name: user.name,
    bio: user.bio,
    website: user.website,
    profileImage: user.profileImage,
    profileCover: user.profileCover,
  });

  const inputHandler = async (e) => {
    if (e.target.files) {
      const imageUrl = await uploadImage(e.target.files[0]);
      console.log(imageUrl, e.target.name);
      setUserDetails((previousVal) => ({
        ...previousVal,
        [e.target.name]: imageUrl,
      }));
    } else {
      setUserDetails((previousVal) => ({
        ...previousVal,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const updateUserBtn = async () => {
    getUpdateUser(userDetails);
  };
  return (
    <section className="fixed inset-0 h-screen w-screen flex justify-center items-center z-30 bg-grayLight/50">
      <main className="bg-white w-5/12 min-w-96 rounded-md ">
        <div className="h-40 w-full  relative">
          <img
            src={
              userDetails.profileCover
                ? userDetails.profileCover
                : "https://img.freepik.com/free-vector/hand-painted-background-violet-orange-colours_23-2148427578.jpg?w=2000"
            }
            alt="cover img"
            className="object-cover h-full w-full"
          />
          <button
            className="absolute right-2 top-2 text-grayLight hover:text-white"
            onClick={() => setToggleEditModal(false)}
          >
            <span className="material-icons-outlined ">close</span>
          </button>

          <label
            htmlFor="coverFile"
            className="cursor-pointer hover:opacity-40 opacity-30"
          >
            <span className="material-icons-outlined absolute z-20 inset-11 inset-x-64 text-8xl">
              photo_camera
            </span>
          </label>
          <input
            type="file"
            id="coverFile"
            accept=".png,.jpeg,.jpg"
            className="hidden"
            name="profileCover"
            onChange={inputHandler}
          />

          <div className="w-36 h-36 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900 absolute border-solid border-white border-4 text-4xl top-1/4 left-5 overflow-hidden">
            {userDetails.profileImage ? (
              <img
                src={userDetails.profileImage}
                alt="profile-bg"
                className="object-cover h-full"
              />
            ) : (
              userDetails.name && userDetails.name[0].toUpperCase()
            )}
            {/* <img src={profileBg} alt="profile-bg" /> */}
            <input
              type="file"
              id="imageFile"
              accept=".png,.jpeg,.jpg"
              className="hidden"
              name="profileImage"
              onChange={inputHandler}
            />
          </div>
          <label htmlFor="imageFile" className="cursor-pointer">
            <span className="material-icons-outlined absolute z-20 top-36 left-32 opacity-90 text-primary-800 hover:opacity-100">
              photo_camera
            </span>
          </label>
        </div>
        <section className="mt-10 m-8">
          <form>
            <label className="mt-3">
              <span className="block text-sm font-medium text-slate-700 mt-4">
                Name
              </span>
              <input
                className=" border border-solid p-1 w-full required:border-red "
                placeholder="Name"
                value={userDetails.name}
                name="name"
                onChange={inputHandler}
              />
            </label>
            <label className="mt-3">
              <span className="block text-sm font-medium text-slate-700 mt-4">
                Bio
              </span>
              <input
                className=" border border-solid p-1 w-full required:border-red "
                placeholder="Present yourself to social"
                value={userDetails.bio}
                name="bio"
                onChange={inputHandler}
              />
            </label>
            <label className="mt-3">
              <span className="block text-sm font-medium text-slate-700 mt-4">
                Website
              </span>
              <input
                className=" border border-solid p-1 w-full required:border-red "
                placeholder="Tanishksharma.com"
                value={userDetails.website}
                name="website"
                onChange={inputHandler}
              />
            </label>

            <button
              onClick={() =>
                user.email === "tanishk15@gmail.com"
                  ? alert("You cannot delete test login account")
                  : deleteUser
              }
              type="button"
              className="text-white text-center w-100    opacity-80  dark:focus:ring-primary-800 font-medium  hover:opacity-100 float-right  px-5 py-1 rounded-md text-center mb-4 mt-4"
            >
              <span className="text-black border-primary-800 border p-1 rounded pr-3 pl-3">
                Delete A/C
              </span>
            </button>
            <button
              onClick={updateUserBtn}
              type="button"
              className="text-white text-center w-100 bg-gradient-to-br from-primary-800 to-primary-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-xl opacity-80  dark:focus:ring-primary-800 font-medium  hover:opacity-100 float-right  px-5 py-1 rounded-md text-center mb-4 mt-4"
            >
              <span>Update Profile</span>
            </button>
          </form>
        </section>
      </main>
    </section>
  );
};

export { EditModal };
