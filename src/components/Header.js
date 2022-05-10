import React from "react";

const Header = () => {
  return (
    <header className=" bg-primary-100 p-2 sticky top-0 z-20">
      <div className="flex items-center mx-12">
        <span className="material-icons text-4xl ">flutter_dash</span>

        <div className="flex border-solid border ml-2 rounded-sm justify-center items-center p-1">
          <span className="material-icons text-2xl">search</span>
          <input
            type="text"
            placeholder="search"
            className="focus:outline-none bg-primary-100 text-2xl"
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
