import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postSignupDetails } from "../features/authSlice";
import { validSignUp } from "../utils/auth";
const Signup = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state);
  console.log(userDetails.auth);

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [signUpErrors, setSignUpErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
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
    console.log("siggn clicked");
    // dispatch(postSignupDetails(signUpData));
  };

  return (
    <div className=" grid grid-cols-2 h-screen gap-4 ">
      <div className="border-2 border-solid flex items-center justify-center  ">
        <h2>LET'S START IT !!</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>CREATE NEW ACCOUNT</h1>
        <form onSubmit={handleSignup}>
          <label className="mt-3">
            <span className="block text-sm font-medium text-slate-700 mt-2">
              First Name
            </span>
            <input
              className=" border border-solid p-1 w-full required:border-red "
              placeholder="First Name"
              name="firstName"
              value={signUpData.firstName}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.firstName && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.firstName}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700 mt-2">
              Last Name
            </span>
            <input
              className=" border border-solid p-1 w-full  required:border-red"
              placeholder="Last Name"
              name="lastName"
              value={signUpData.lastName}
              onChange={inputHandler}
            />
          </label>
          {signUpErrors.lastName && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {signUpErrors.lastName}
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
          <button className="bg-gradient-to-r px-5  rounded-md w-full block ease-in-out duration-300 from-primary-400 to-primary-600 p-1 text-white hover:-translate-y-0.5 hover:shadow-md">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
};

export { Signup };
