import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginDetails } from "../features/authSlice";
import { validLogin } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import landingImg from "../assets/sociallife.png";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
    others: "",
  });
  const inputHandler = (e) => {
    setLoginData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setLoginErrors((loginErr) => ({ ...loginErr, [e.target.name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validLogin(loginData, loginErrors);
    if (!isValid) {
      setLoginErrors(errors);
      return;
    }
    try {
      await dispatch(postLoginDetails(loginData)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const testLoginHandler = () => {
    setLoginData({ username: "tanishk15", password: "Tanishk" });
  };
  return (
    <div className=" grid grid-cols-2 h-screen gap-4 ">
      <div className="flex items-center justify-center  ">
        <img src={landingImg} alt="social-life" className="mb-5" />
      </div>
      <div className="flex bg-primary-50 flex-col items-center justify-center">
        <h1 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800 flex items-center justify-center">
          <span className="text-primary-700 ">S</span>
          PLASH
          <span className="material-icons text-4xl flex ml-2 text-primary-900 ">
            flutter_dash
          </span>
        </h1>
        <form onSubmit={handleLogin}>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              username
            </span>
            <input
              type="text"
              className=" border border-solid p-1 w-full "
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={inputHandler}
            />
          </label>
          {loginErrors.username && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {loginErrors.username}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              className=" border border-solid p-1 w-full "
              placeholder="**********"
              name="password"
              value={loginData.password}
              onChange={inputHandler}
            />
          </label>
          {loginErrors.password && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {loginErrors.password}
            </span>
          )}

          <button className="bg-gradient-to-r mt-5  w-full block ease-in-out duration-300 from-primary-400 to-primary-600 p-1 text-white hover:-translate-y-0.5 hover:shadow-md">
            {loggedUser.status === "loading" ? "loading" : "LOGIN"}
          </button>
          <button
            onClick={testLoginHandler}
            className="border  ease-out duration-200 mt-3 border-primary-800 p-1 pr-5 pl-5 hover:-translate-y-0.5 hover:shadow-md"
          >
            Login with Test Credentials
          </button>
        </form>
        <h3 className="underline">OR</h3>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-primary-800  font-semibold">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login };
