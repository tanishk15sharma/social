import React from "react";

const CreatePost = () => {
  return (
    <div className="p-4 px-9 shadow-xl rounded-xl mb-5 mt-3">
      <div className="mb-1 flex  items-center ">
        <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
          T
        </div>

        <div className="leading-5 w-full pl-2">
          <input
            placeholder="hey username share your... !"
            className="w-full focus:outline-none "
          />
        </div>
      </div>
      <div className="flex justify-between mt-2 p-4 items-center">
        <div className="text-grayLight font-thin">
          <span class="material-icons-outlined mr-2">collections</span>
          <span class="material-icons-outlined ml-2">
            sentiment_satisfied_alt
          </span>
        </div>
        <button
          type="button"
          className="text-white text-center w-100 bg-gradient-to-br from-primary-500 to-primary-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-md  dark:focus:ring-primary-800 font-medium rounded opacity-70  text-sm  px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-90"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export { CreatePost };
