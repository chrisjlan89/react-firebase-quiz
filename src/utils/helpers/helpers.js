// conver to format we want

//choose the first question of that array and pass it to the question compoent
export const questions = results => {
  if (!results) return [];
  const formattedQuestions = results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question,
      answerChoices: [...loadedQuestion.incorrect_answers]
    };
    formattedQuestion.answer = Math.floor(Math.random() * 4);
    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      loadedQuestion.correct_answer
    );
    return formattedQuestion;
  });
  return formattedQuestions;
};

// results.map(loadedQuestion => {
//   const formattedQuestion = {
//     question: loadedQuestion.question,
//     answerChoices: [...loadedQuestion.incorrect_answers]
//   };

//});
