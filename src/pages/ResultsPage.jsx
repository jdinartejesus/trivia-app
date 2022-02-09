import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuizContext from "../contexts/QuizContext";

import "./ResultsPage.css";

function ResultsPage() {
  const navigate = useNavigate();
  const { getResults, isPlaying, replay } = useContext(QuizContext);

  useEffect(() => {
    if (isPlaying()) return navigate("/quiz");
  });

  const results = getResults();

  const totalQuestions = results.length;
  const totalCorrectAnswers = results.filter((q) => !!q.answered).length;

  return (
    <div className="app__page results-page">
      <header className="page__header">
        <h3>
          You Scored: <br /> {totalCorrectAnswers}/{totalQuestions}
        </h3>
      </header>

      <main className="page__body">
        <div className="body__content-row">
          <ul className="results">
            {results.map((question, index) => (
              <li className="results__item" key={index}>
                <h3>{question.answered ? "+" : "-"}</h3>
                <p dangerouslySetInnerHTML={{ __html: question?.question }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="body__action-row">
          <button className="body__action" onClick={() => replay()}>
            PLAY AGAIN?
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
