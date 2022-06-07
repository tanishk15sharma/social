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

  return (
    <div className="ml-3 relative" onClick={() => setSearchUser("")}>
      <input
        type="text"
        placeholder="search"
        value={searchUser}
        className="focus:outline-none bg-primary-100 border-b border-black"
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <div
        className="rounded mt-2 absolute bg-primary-50 max-h-30 w-60 overflow-y-scroll shadow
    scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-200"
      >
        {searchOutput.map((user) => (
          <UserInfo user={user} />
        ))}
      </div>
    </div>
  );
};

export { SearchUsers };
