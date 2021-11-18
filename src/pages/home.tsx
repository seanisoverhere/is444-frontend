import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Home/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, bankingSelector } from "../store/bank";

const Home: React.FC<{}> = () => {
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

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchDetails());
    }, 1000);
  }, [dispatch]);

  const { loading } = useSelector(bankingSelector);

  console.log(loading);

  return (
    <div className="flex">
      {!loading ? (
        <>
          <div className="flex-none fixed z-10 overflow-x-hidden top-0 left-0 shadow-md">
            <Sidebar />
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            className="flex-1 ml-56 max-w-7xl"
          >
            <div className="container mx-12">
              <Dashboard />
            </div>
          </motion.div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
