import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";

const SearchUsers = () => {
  const { allUsers } = useSelector((state) => state.users);
  const [searchUser, setSearchUser] = useState("");
  const searchOutput = allUsers.filter((user) =>
    searchUser
      ? user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.username.toLowerCase().includes(searchUser.toLowerCase())
      : ""
  );
  console.log(searchOutput);
  return (
    <div className="ml-3 relative">
      <input
        type="text"
        placeholder="search"
        value={searchUser}
        className="focus:outline-none bg-primary-100 border-b border-black"
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <div className="rounded mt-2 absolute bg-primary-50 max-h-60 w-60 overflow-y-scroll shadow">
        {searchOutput.map((user) => (
          <UserInfo user={user} />
        ))}
      </div>
    </div>
  );
};

export { SearchUsers };
