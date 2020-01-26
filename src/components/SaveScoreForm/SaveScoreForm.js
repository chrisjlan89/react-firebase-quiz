import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../Firebase/FirebaseContext";

const SaveScoreForm = ({ score, scoreSaved }) => {
  const [submitValues, setSubmitValues] = useState({
    username: ""
  });

  const firebase = useFirebase();

  const onSetSubmitValues = e => {
    setSubmitValues({
      ...submitValues,
      [e.target.name]: e.target.value
    });
    // setSubmitValues(prevState => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value
    // }));
  };

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      ...submitValues,
      score
    };
    firebase.scores().push(record, () => {
      console.log("Score Saved");
      scoreSaved();
    });
  };

  return (
    <>
      <h1>Score: {score} </h1>
      <form onSubmit={saveHighScore}>
        <input
          onChange={onSetSubmitValues}
          type="text"
          name="username"
          id="username"
          value={submitValues.username}
        ></input>
        <button disabled={!submitValues.username} type="submit" className="btn">
          SAVE SCORE
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </>
  );
};

export default SaveScoreForm;
