import React, { useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";

export default function Home() {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <>
      {openSettings ? (
        <>
          <Settings />
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="btn"
          >
            Close Settings
          </button>
        </>
      ) : (
        <>
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
    </>
  );
}
