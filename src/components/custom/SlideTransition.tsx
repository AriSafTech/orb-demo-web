import React from "react";
import { motion } from "framer-motion";

const SlideTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideTransition;
