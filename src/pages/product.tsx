import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";
import Products from "../components/Products/Products";

const Product: React.FC<{}> = () => {
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

  return (
    <div className="flex">
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
          <Products />
        </div>
      </motion.div>
    </div>
  );
};

export default Product;
