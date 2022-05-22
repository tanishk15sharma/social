import React from "react";
import { SearchUsers } from "./SearchUsers";

const Header = () => {
  return (
    <header className=" bg-primary-100 p-2 sticky top-0 z-20">
      <div className="flex items-center mx-12">
        <span className="material-icons text-4xl ">flutter_dash</span>

        <SearchUsers />
      </div>
    </header>
  );
};

export { Header };
