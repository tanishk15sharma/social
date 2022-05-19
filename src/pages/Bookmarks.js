import React from "react";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Bookmarks = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <h1>bookmarks</h1>
        <Suggestions />
      </div>
    </div>
  );
};

export { Bookmarks };
