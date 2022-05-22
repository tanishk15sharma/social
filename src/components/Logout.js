import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <button
        className="p-1 bg-primary-50 w-full hover:bg-primary-200"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export { Logout };
