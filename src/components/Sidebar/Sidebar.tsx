import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits, MdOutlineHome } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

const Sidebar: React.FC<{}> = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div className="flex justify-start pt-6 items-center">
          <div className="inline-flex items-center mx-8">
            <svg
              className="w-8 text-indigo-500"
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
            <span className="ml-2 text-lg font-bold tracking-wide text-gray-800 uppercase">
              Deez Rupt
            </span>
          </div>
        </div>
        <ul className="flex flex-col py-16">
          <li>
            <Link
              to="/"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center pl-8 pr-2">
                <MdOutlineHome size={24} className="text-indigo-500" />
              </span>
              <span className="text-sm font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center pl-8 pr-2">
                <MdOutlineProductionQuantityLimits
                  size={24}
                  className="text-indigo-500"
                />
              </span>
              <span className="text-sm font-medium">Products</span>
            </Link>
          </li>
        </ul>
        <div className="flex flex-col h-full py-8 justify-end ml-4">
          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center space-x-2">
              <BiUserCircle size={30} />
              <div className="flex justify-start flex-col items-start mr-4">
                <p className="font-medium text-xs text-gray-500">Sean Choon</p>
                <p className="font-medium text-xs text-gray-500">
                  sean@gmail.com
                </p>
              </div>
            </div>
            <Link to="/login">
              <FiLogOut size={22} className="mr-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
