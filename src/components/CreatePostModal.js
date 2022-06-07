import React from "react";

import { CreatePost } from "./CreatePost";

const CreatePostModal = ({ setTogglePostModal, editDetails, closeModal }) => {
  return (
    <section
      onClick={() => setTogglePostModal((preVal) => !preVal)}
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-grayLight/50"
    >
      <main
        className="bg-white w-5/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded-md drop-shadow-xl mt-28"
        onClick={(e) => e.stopPropagation()}
      >
        <CreatePost
          editDetails={editDetails}
          closeEditModal={closeModal}
          closeCreateModal={setTogglePostModal}
        />
      </main>
    </section>
  );
};

export { CreatePostModal };
