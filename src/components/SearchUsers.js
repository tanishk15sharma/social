import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";

const SearchUsers = () => {
  const { allUsers } = useSelector((state) => state.users);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const timeoutId = useRef(null);

  const searchDebounce = (value) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (!value) {
      return setSearchedUsers([]);
    }
    timeoutId.current = setTimeout(() => {
      console.log(value);
      setSearchedUsers(
        allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 700);
  };

  return (
    <div className="ml-3 relative">
      <input
        type="text"
        placeholder="search"
        value={searchInput}
        className="focus:outline-none bg-primary-100 border-b border-black"
        onChange={(e) => {
          searchDebounce(e.target.value);
          setSearchInput(e.target.value);
        }}
      />
      <div
        className="rounded mt-2 absolute bg-primary-50 max-h-30 w-60 overflow-y-scroll shadow
    scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-200"
      >
        {searchInput.length !== 0 && searchedUsers.length === 0 ? (
          <h1 className="p-4 text-red">No User Found</h1>
        ) : (
          searchedUsers.map((user) => <UserInfo user={user} />)
        )}
      </div>
    </div>
  );
};

export { SearchUsers };
