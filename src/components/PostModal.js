import React from "react";
import { useSelector } from "react-redux";

const PostModal = ({ desc, setDesc }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="fixed inset-0 h-screen w-screen  flex justify-center items-start z-30 bg-grayLight/50">
      <main className="bg-white w-5/12 min-w-96 rounded-md drop-shadow-xl mt-28">
        <div className="mb-1 flex p-4 items-center ">
          <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
            {user.name && user.name[0].toUpperCase()}
          </div>

          <div className="leading-5 w-full pl-2">
            <input
              placeholder={`hey ${user.name} share your... !`}
              className="w-full focus:outline-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <form
          className="text-grayLight flex justify-between mt-2 p-4 items-center"
          // onSubmit={submitHandler}
        >
          <div>
            <label htmlFor="imageFile" className="cursor-pointer">
              <span className="material-icons-outlined mr-2">collections</span>
              <input
                type="file"
                id="imageFile"
                accept=".png,.jpeg,.jpg"
                className="hidden"
                //   onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>
            <span className="material-icons-outlined ml-2">
              sentiment_satisfied_alt
            </span>
          </div>
          <button
            type="submit"
            className="text-white text-center w-100 bg-gradient-to-br from-primary-500 to-primary-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-md  dark:focus:ring-primary-800 font-medium rounded opacity-70  text-sm  px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-90"
          >
            Post
          </button>
        </form>
      </main>
    </section>
  );
};

export { PostModal };
