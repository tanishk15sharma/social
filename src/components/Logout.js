import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/user";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="p-1 bg-primary-50 w-full hover:bg-primary-200"
        onClick={() => logoutUser(navigate)}
      >
        Logout
      </button>
    </div>
  );
};

export { Logout };
