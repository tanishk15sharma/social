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
    setLoginData({ username: "tanishkdev", password: "TANISHK" });
  };
  return (
    <div className=" grid grid-cols-2 h-screen gap-4 small-mobile:grid-cols-1">
      <div className="flex items-center justify-center small-mobile:hidden ">
        <img src={landingImg} alt="social-life" className="mb-5" />
      </div>
      <div className="flex bg-primary-50 flex-col items-center justify-center">
        <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800 flex items-center justify-center">
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
            {loggedUser.status ? (
              <div className="flex justify-center">
                <svg
                  role="status"
                  className="w-6 h-6 mr-2 text-primary-100 animate-spin dark:text-primary-600 fill-primary-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "LOGIN"
            )}
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
