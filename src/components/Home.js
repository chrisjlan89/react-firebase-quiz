import React, { useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import { AnimatePresence, motion } from "framer-motion";

export const variants = {
  initial: { x: -1200, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
  exit: { x: 1200, delay: 10, duration: 5 },
};
export default function Home() {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <AnimatePresence>
      {openSettings ? (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Settings />
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="btn"
          >
            Close Settings
          </button>
        </motion.div>
      ) : (
        <
          // variants={variants}
          // initial="initial"
          // animate="animate"
          // exit="exit"
          // style={{ display: "grid", justifyContent: "center;" }}
        >
          <h1>Quiz App</h1>
          <Link to="/game" className="btn">
            Start Game
          </Link>
          <Link to="/highScores" className="btn">
            High Scores
          </Link>
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="btn"
          >
            Settings
          </button>
        </>
      )}
    </AnimatePresence>
  );
}
