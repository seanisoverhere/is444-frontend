import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Test from "../components/Test/test";

const Home: React.FC<{}> = () => {
  return (
    <>
      <Sidebar />
      <Test />
    </>
  );
};

export default Home;
