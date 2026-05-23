import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotebookPage from "./pages/NotebookPage";
import QuizPage from "./pages/QuizPage";
import { ROUTERS } from "./const";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTERS.HOME} element={<HomePage />} />
        <Route path={ROUTERS.NOTEBOOK} element={<NotebookPage />} />
        <Route path={ROUTERS.QUIZ} element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
