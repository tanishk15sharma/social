import React from "react";
import { BottomNav } from "../components/BottomNav";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Explore = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3 mobile:gap-0">
        <SideNav />
        <BottomNav />
        <Feed />
        <Suggestions />
      </div>
    </div>
  );
};

export { Explore };
