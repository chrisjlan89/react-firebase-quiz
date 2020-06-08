import React, { useEffect, useState } from "react";
import { useFirebase } from "./Firebase/FirebaseContext";
import Loader from "./Loader/Loader";
import { Link } from "react-router-dom";

const HighScores = () => {
  const firebase = useFirebase();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.scores().once("value", (snapshot) => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  }, [firebase]);

  const formatScoreData = (firebaseScores) => {
    const scores = [];

    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;

      scores.push(val);
    }
    const sortedScores = scores.sort(
      (score1, score2) => score2.score - score1.score
    );

    return sortedScores.slice(0, 10);
  };
  console.log(scores);
  if (loading) return <Loader />;
  return (
    <>
      <h1>Hi Scores</h1>
      <div id="highScoresList">
        {scores.map((score) => (
          <div className="high-score" key={score.score}>
            <h4 className="username"> {score.username}</h4>
            <h4 className="score"> {score.score}</h4>
          </div>
        ))}
      </div>
      <Link className="btn" to="/">
        Return Home
      </Link>
    </>
  );
};

export default HighScores;
