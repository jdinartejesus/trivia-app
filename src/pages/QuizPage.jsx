import { useContext } from "react";

import QuizContext from "../contexts/QuizContext";

import "./QuizPage.css";

function QuizPage() {
  const { quiz, activeQuestionIndex, getActiveQuestion, setAnswer } =
    useContext(QuizContext);

  const question = getActiveQuestion();

  const totalQuestions = quiz.length;
  const numActiveQuestion = activeQuestionIndex + 1;

  return (
    <div className="app__page quiz-page">
      <header className="page__header">
        <h4>{question?.category}</h4>
      </header>

      <main className="page__body">
        <div className="body__content-row">
          <div className="card__question">
            <p dangerouslySetInnerHTML={{ __html: question?.question }} />
          </div>

          <p>
            {numActiveQuestion} of {totalQuestions}
          </p>
        </div>

        <div className="body__action-row">
          <button className="body__action" onClick={() => setAnswer("True")}>
            True
          </button>

          <button className="body__action" onClick={() => setAnswer("False")}>
            False
          </button>
        </div>
      </main>
    </div>
  );
}

export default QuizPage;
