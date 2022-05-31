import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSignupDetails } from "../features/authSlice";
import { validSignUp } from "../utils/auth";
import landingImg from "../assets/sociallife.png";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth);

  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    terms: false,
  });

  const [signUpErrors, setSignUpErrors] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    terms: "",
  });

  const inputHandler = (e) => {
    if (e.target.value === "checkbox") {
      setSignUpData((signUpData) => ({
        ...signUpData,
        [e.target.id]: e.target.checked,
      }));
    }
    setSignUpData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setSignUpErrors((errData) => ({
      ...errData,
      [e.target.name]: "",
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { isValid, errors } = validSignUp(signUpData, signUpErrors);
    if (!isValid) {
      setSignUpErrors(errors);
      return;
    }
    console.log("sign clicked");
    dispatch(postSignupDetails(signUpData));
    navigate("/");
  };

  return (
    <div className=" grid grid-cols-2 h-screen gap-4 ">
      <div className=" flex items-center justify-center  ">
        <img src={landingImg} alt="social-life" className="mb-5" />
      </div>
      <div className="flex flex-col bg-primary-50 items-center justify-center">
        <h3 class="text-3xl font-normal leading-normal mt-0 mb-2 text-primary-800">
          CREATE NEW ACCOUNT
        </h3>
        <form onSubmit={handleSignup}>
          <label>
            <span className="block text-sm font-medium text-slate-700 mt-2">
              Name
            </span>
            <input
              className=" border border-solid p-1 w-full  required:border-red"
              placeholder="Name"
              name="name"
              value={signUpData.name}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.name && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.name}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700 mt-2">
              Username
            </span>
            <input
              className=" border border-solid p-1 w-full  required:border-red"
              placeholder="Username"
              name="username"
              value={signUpData.username}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.username && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.username}
            </span>
          )}

          <label>
            <span className="block text-sm font-medium text-slate-700 mt-2">
              Email
            </span>
            <input
              className=" border border-solid p-1 w-full  required:border-red"
              placeholder="Email"
              name="email"
              value={signUpData.email}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.email && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.email}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700 ">
              Password
            </span>
            <input
              className=" border border-solid p-1 w-full required:border-red"
              placeholder="**********"
              name="password"
              value={signUpData.password}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.password && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.password}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700 mt-2">
              Confirm Password
            </span>
            <input
              className=" border border-solid p-1 w-full required:border-red"
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.confirmPassword && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.confirmPassword}
            </span>
          )}
          <label htmlFor="terms" className="block mt-4">
            <input
              name="terms"
              value={signUpData.terms}
              onChange={inputHandler}
              type="checkbox"
              id="terms"
            />
            <span className="text-sm font-medium text-slate-700 mt-4">
              I accept all Terms & Conditions
            </span>
          </label>
          {signUpErrors.username && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.terms}
            </span>
          )}
          <button className="bg-gradient-to-r px-5   w-full block ease-in-out duration-300 from-primary-400 to-primary-600 p-1 text-white hover:-translate-y-0.5 hover:shadow-md">
            {loggedUser.status === "loading" ? "loading" : "SIGNUP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export { Signup };
