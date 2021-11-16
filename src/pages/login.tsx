import React, { useState } from "react";
import OTP from "../components/OTP/OTP";
import { Link } from "react-router-dom";

const Login: React.FC<{}> = () => {
  const [showOTP, setShowOTP] = useState(false);

  const signIn = () => {
    setShowOTP(!showOTP);

    // if show OTP == true && OTP == correct
      // Log in (dispatch action to store auth details and redirect to login page)

  };

  return (
    <div className="bg-white h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <div className="bg-black text-white font-bold text-xl p-4">
              DEEZ RUPT
            </div>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <svg
              className="w-12 text-indigo-500 mx-auto"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <form className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {showOTP ? (
                <div className="mt-6">
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
                    onChangeOTP={(otp) => console.log("String OTP: ", otp)}
                  />
                </div>
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
        </div>

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
