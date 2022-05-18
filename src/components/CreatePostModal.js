import React from "react";

import { CreatePost } from "./CreatePost";

const CreatePostModal = ({ setTogglePostModal }) => {
  return (
    <section
      onClick={() => setTogglePostModal((preVal) => !preVal)}
      className="fixed inset-0 h-screen w-screen  flex justify-center items-start z-30 bg-grayLight/50"
    >
      <main
        className="bg-white w-5/12 min-w-96 rounded-md drop-shadow-xl mt-28"
        onClick={(e) => e.stopPropagation()}
      >
        <CreatePost />
      </main>
    </section>
  );
};

export { CreatePostModal };
