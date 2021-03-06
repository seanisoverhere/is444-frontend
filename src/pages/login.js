import React, { useState, useRef } from "react";
import OTP from "../components/OTP/OTP";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const variants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { ...transition },
    },
  };

  const userInputRef = useRef();
  const passwordInputRef = useRef();

  let myOtp;

  const signIn = (e) => {
    e.preventDefault();
    const enteredUser = userInputRef.current?.value;
    const enteredPin = passwordInputRef.current?.value;

    if (!enteredUser || !enteredPin) {
      return;
    }

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

    if (!isOtp) {
      axios
        .post(process.env.REACT_APP_LOGIN, {
          userID: enteredUser,
          pin: enteredPin,
        })
        .then((res) => {
          if (res.status === 200) {
            setShowOTP(true);
            setIsOtp(true);
          }
        });
    } else {
      axios
        .post(process.env.REACT_APP_LOGIN, {
          userID: enteredUser,
          pin: enteredPin,
          otp: myOtp,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(authActions.login(enteredUser));
            navigate("/")
          }
        });
    }
  };

  return (
    <div className="bg-white h-screen">
      <div className="w-full flex flex-wrap">
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          className="w-full md:w-1/2 flex flex-col"
        >
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <img src={Logo} className="mx-auto w-40" alt="Deez Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <form className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="user" className="text-lg">
                  Username
                </label>
                <input
                  type="text"
                  id="user"
                  ref={userInputRef}
                  placeholder="Username"
                  className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Pin
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  placeholder="Pin"
                  className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {showOTP ? (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={variants}
                  className="mt-6"
                >
                  <h1 className="mt-6 mb-4 text-xl font-semibold text-gray-700">
                    Verification Code
                  </h1>
                  <h3 className="my-4 text-md text-gray-400">
                    We have sent you an OTP to verify your account
                  </h3>
                  <OTP
                    autoFocus
                    length={6}
                    className="flex justify-between items-center"
                    inputClassName="w-14 h-14 text-4xl text-center"
                    onChangeOTP={(otp) => (myOtp = otp)}
                  />
                </motion.div>
              ) : null}

              <Link
                to="#"
                className="group mt-8 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={signIn}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </Link>
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?{" "}
                <span className="underline font-semibold text-indigo-500">
                  Register here.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/jj8ldRbRpPw"
            alt="Bank background"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
