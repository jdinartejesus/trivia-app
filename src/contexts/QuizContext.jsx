import { useNavigate } from "react-router-dom";
import { createContext, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import { getQuiz } from "../services";

const QuizContext = createContext({});

function QuizContextProvider(props) {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useLocalStorage("quiz", []);
  // eslint-disable-next-line prettier/prettier
  const [activeQuestionIndex, setActiveQuestionIndex] = useLocalStorage("activeQuestionIndex", 0);
  const [answers, setAnswers] = useLocalStorage("answers", []);

  async function getQuizInitial() {
    const data = await getQuiz();
    if (!quiz.length) return setQuiz(data);
  }

  useEffect(() => {
    getQuizInitial();
  });

  const getActiveQuestion = () => quiz[activeQuestionIndex];

  const handleAnswer = (answer) => {
    const activeQuestion = getActiveQuestion();

    if (activeQuestion?.correct_answer === answer)
      return setAnswers([...answers, { ...activeQuestion, answered: true }]);
    return setAnswers([...answers, { ...activeQuestion, answered: false }]);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = activeQuestionIndex + 1;
    const lastQuestionIndex = quiz.length - 1;

    if (nextQuestionIndex > lastQuestionIndex) return navigate("/results");
    return setActiveQuestionIndex(nextQuestionIndex);
  };

  const setAnswer = (answer) => {
    handleAnswer(answer);
    return handleNextQuestion();
  };

  const getResults = () => answers;

  const isPlaying = () => activeQuestionIndex < quiz.length - 1;

  const replay = () => {
    setQuiz([]);
    setAnswers([]);
    setActiveQuestionIndex(0);

    return navigate("/");
  };

  return (
    <QuizContext.Provider
      value={{
        activeQuestionIndex,
        quiz,
        setAnswer,
        getActiveQuestion,
        getResults,
        isPlaying,
        replay,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
export { QuizContextProvider };
