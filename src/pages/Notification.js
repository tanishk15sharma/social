import React from "react";
import { Header } from "../components/Header";
import { Notifications } from "../components/Notifications";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Notification = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <div className="m-3 w-2/5 mr-8">
          <Notifications />
          <Notifications />
          <Notifications />
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export { Notification };
