import React from "react";
import { Header } from "../components/Header";

import { Feed } from "../components/Feed";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <Feed />
        <Suggestions />
      </div>
    </div>
  );
};

export { Home };
