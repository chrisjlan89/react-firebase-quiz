import React, { useState } from "react";

const Question = ({ question, changeQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answering, setAnswering] = useState(false);
  const [classToApply, setClassToApply] = useState("");

  const checkAnswer = selectedAnswer => {
    if (answering) return;
    setAnswering(true);

    const classToApply =
      selectedAnswer === question.answer ? "correct" : "incorrect";
    console.log(classToApply, selectedAnswer, question.answer);
    setClassToApply(classToApply);
    const bonus = selectedAnswer === question.answer ? 10 : 0;
    setSelectedAnswer(selectedAnswer);

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswering(false);
      changeQuestion("", bonus);
    }, 1000);

    //  if(question.answer === selectedAnswer)
  };
  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>

      {question.answerChoices.map((choice, index) => (
        <div
          onClick={() => checkAnswer(index)}
          key={index}
          className={`choice-container ${selectedAnswer === index &&
            classToApply}`}
        >
          <p className="choice-prefix">{index + 1}</p>
          <p
            dangerouslySetInnerHTML={{ __html: choice }}
            className="choice-text"
          ></p>
        </div>
      ))}
    </>
  );
};

export default Question;
