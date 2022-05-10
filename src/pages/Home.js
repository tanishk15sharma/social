import React from "react";
import { Header } from "../components/Header";

import { PostLists } from "../components/PostLists";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <PostLists />
        <Suggestions />
      </div>
    </div>
  );
};

export { Home };
