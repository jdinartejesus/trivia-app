import { Outlet } from "react-router-dom";

import "./App.css";
import { QuizContextProvider } from "./contexts/QuizContext";

function App() {
  return (
    <div className="app">
      <QuizContextProvider>
        <Outlet />
      </QuizContextProvider>
    </div>
  );
}

export default App;
