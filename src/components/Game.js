import React, { useMemo, useState } from "react";
import Question from "./Question";
import { GetQuestions } from "../utils/helpers/dataHook";
import { questions } from "../utils/helpers/helpers";
import Loader from "./Loader/Loader";
import HUD from "./Hud/Hud";
import SaveScoreForm from "./SaveScoreForm/SaveScoreForm";

const Game = ({ history: { push } }) => {
  const [state, setState] = useState({
    questions: "",
    currentQuestion: "",
    score: 0,
    questionNumber: 0,
    done: false,
  });

  const { data, loading } = GetQuestions(10);

  const changeQuestion = (data, bonus = 0) => {
    if (state.questions.length === 0 && !data) {
      setState((prevState) => ({
        ...prevState,
        score: prevState.score + bonus,
        done: true,
      }));
      return;
    }
    const dataToEvaluate = data ? data : state.questions;
    //  Get random Index of A question
    const randomQuesitonIndex = Math.floor(
      Math.random() * dataToEvaluate.length
    );
    // Set Current Question to the question of that rand index
    const currentQuestion = dataToEvaluate[randomQuesitonIndex];
    // remove that question from the questions going forward

    const remainingQuestions = [...dataToEvaluate];
    remainingQuestions.splice(randomQuesitonIndex, 1);
    // update state to reflects

    setState((prevState) => ({
      ...prevState,
      questions: remainingQuestions,
      currentQuestion,
      score: prevState.score + bonus,
      questionNumber: prevState.questionNumber + 1,
    }));
  };

  useMemo(() => {
    if (!loading) {
      changeQuestion(questions(data));
    }
  }, [loading]);

  const scoreSaved = () => {
    push("/");
  };

  // request question set from api

  if (loading) return <Loader />;
  const { done, score, currentQuestion, questionNumber } = state;

  return (
    <>
      {currentQuestion && !done && (
        <>
          <HUD questionNumber={questionNumber} score={score}></HUD>
          <Question
            changeQuestion={changeQuestion}
            question={currentQuestion}
          />
        </>
      )}

      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
};

export default Game;
