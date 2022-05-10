import React from "react";

const PostCard = () => {
  return (
    <div className=" p-4 px-9 shadow-xl rounded-xl mb-5 mt-3">
      <div className="mb-1 flex  items-center">
        <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
          T
        </div>
        <div className="leading-5 ">
          <span>
            Tanishk Shamra
            <span className="block text-gray">@tanishksharma 1h</span>
          </span>
        </div>
      </div>
      <h3 className="font-medium">title</h3>
      <p className="my-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
        asperiores nihil iure aut reiciendis hic itaque voluptas, voluptates
        necessitatibus officiis doloremque sapiente quidem? Magni molestiae
        perferendis incidunt, nesciunt dicta quia.
      </p>
      <div className="flex justify-between mt-2 text-grayLight font-thin">
        <div className="flex">
          <span className="material-icons mr-1">favorite_border</span>2
        </div>
        <div className="flex">
          <span className="material-icons-outlined">mode_comment</span>1
        </div>
        <div className="flex">
          <span className="material-icons mr-1">bookmark_border</span>
        </div>
        <div className="flex">
          <span className="material-icons mr-1">share</span>
        </div>
      </div>
    </div>
  );
};

export { PostCard };
