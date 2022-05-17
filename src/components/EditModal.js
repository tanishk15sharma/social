import React, { useState } from "react";
import { useSelector } from "react-redux";
import { uploadImage } from "../utils/posts";

const EditModal = ({ setToggleEditModal }) => {
  const { user } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(null);

  const [userDetails, setUserDetails] = useState({
    name: user.name,
    bio: user.bio,
    website: "",
    profileImage: "",
  });

  const inputHandler = (e) => {
    setUserDetails((previousVal) => ({
      ...previousVal,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUserBtn = async () => {
    const imageUrl = await uploadImage(imageFile);
    setUserDetails((previousVal) => ({
      ...previousVal,
      profileImage: imageUrl,
    }));
    console.log(imageUrl);
  };

  return (
    <section className="fixed inset-0 h-screen w-screen flex justify-center items-center z-30 bg-grayLight/50">
      <main className="bg-white w-5/12 min-w-96 rounded-md ">
        <div className="h-40 w-full border border-solid bg-gradient-to-r from-black to-black relative">
          <button
            className="absolute right-2 top-2 text-grayLight hover:text-white"
            onClick={() => setToggleEditModal(false)}
          >
            <span className="material-icons-outlined ">close</span>
          </button>
          <div className="w-36 h-36 bg-primary-200 rounded-full  flex justify-center items-center font-bold text-primary-900 absolute  border-solid border-white border-4 text-4xl top-1/4 left-5">
            T{/* <img src={profileBg} alt="profile-bg" /> */}
            <label htmlFor="imageFile" className="cursor-pointer">
              <span className="material-icons-outlined absolute z-20 opacity-5 hover:opacity-80 text-6xl">
                photo_camera
              </span>
            </label>
            <input
              type="file"
              id="imageFile"
              accept=".png,.jpeg,.jpg"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
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
