import React, { useState } from "react";
import { useSelector } from "react-redux";

import { uploadImage } from "../utils/posts";
import { getUpdateUser } from "../utils/user";

const EditModal = ({ setToggleEditModal }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    bio: user.bio,
    website: user.website,
    profileImage: user.profileImage,
    profileCover: user.profileCover,
  });

  const inputHandler = async (e) => {
    if (e.target.files) {
      setLoading(true);
      const imageUrl = await uploadImage(e.target.files[0]);
      console.log("loading");
      setUserDetails((previousVal) => ({
        ...previousVal,
        [e.target.name]: imageUrl,
      }));
      setLoading(false);
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
    <section
      className="fixed inset-0 h-screen w-screen flex justify-center items-center z-30 bg-grayLight/50"
      onClick={() => setToggleEditModal(false)}
    >
      {loading && (
        <div className="fixed inset-0 h-screen w-screen flex justify-center items-center z-50 bg-grayLight/50">
          <svg
            role="status"
            class="w-11 h-11 mr-2 text-primary-100 animate-spin dark:text-primary-600 fill-primary-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <main
        className="bg-white w-5/12 lg:w-7/12 mobile:w-11/12 min-w-96 rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
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
            title="Close"
            className="absolute right-2 top-2 text-white"
            onClick={() => setToggleEditModal(false)}
          >
            <span className="material-icons-outlined ">close</span>
          </button>

          <label
            htmlFor="coverFile"
            className="cursor-pointer hover:opacity-100 opacity-60"
            title="Edit Cover"
          >
            <span className="material-icons-outlined absolute z-20  top-12 left-60  text-8xl">
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
            <span className="material-icons-outlined text-3xl  absolute z-20 top-36 left-32 opacity-90 text-primary-800 hover:opacity-100">
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
