import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Product: React.FC<{}> = () => {
  return (
    <div className="flex">
      <div className="flex-none fixed z-50 overflow-x-hidden top-0 left-0 shadow-md">
        <Sidebar />
      </div>
      <div className="flex-1 ml-56 max-w-7xl">
        <div className="min-h-screen container flex justify-center items-center">
          PRODUCTS HERE
        </div>
      </div>
    </div>
  );
};

export default Product;
