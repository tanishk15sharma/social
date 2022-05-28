import React from "react";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";
import UserFeed from "../components/UserFeed";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <UserFeed />
        <Suggestions />
      </div>
    </div>
  );
};

export { Home };
