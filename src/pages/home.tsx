import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Home/Dashboard";

const Home: React.FC<{}> = () => {
  return (
    <div className="flex">
      <div className="flex-none fixed z-50 overflow-x-hidden top-0 left-0 shadow-md">
        <Sidebar />
      </div>
      <div className="flex-1 ml-56 max-w-7xl">
        <div className="container mx-12">
          {/* Account Details - Account number, balance ; Transaction history each account ; Portfolio split emergency funds */}
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
