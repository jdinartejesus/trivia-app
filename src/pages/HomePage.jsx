import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const onClickBegin = () => navigate("/quiz");

  return (
    <div className="app__page">
      <header className="page__header">
        <h2>
          Welcome to the <br /> Trivia Challenge!
        </h2>
      </header>

      <main className="page__body">
        <div className="body__content-row">
          <p>You will be presented with 10 True or False questions.</p>

          <p>Can you score 100%?</p>
        </div>

        <div className="body__action-row">
          <button class="body__action" onClick={onClickBegin}>
            BEGIN
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
